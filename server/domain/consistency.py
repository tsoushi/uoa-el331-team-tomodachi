from dataclasses import dataclass
from typing import List

import datetime
import uuid

import spacy

from .text_file import TextFile

nlp = spacy.load('en_core_web_sm')

@dataclass
class ConsistencyTextFile:
    text_file_id: str
    text_file_name: str
    word_counts: List[int]

    def to_dict(self):
        return {
            'textFileId': self.text_file_id,
            'textFileName': self.text_file_name,
            'wordCounts': self.word_counts
        }

@dataclass
class ConsistencyResult:
    id: str
    words: List[str]
    text_files: List[ConsistencyTextFile]
    created_at: datetime.datetime = datetime.datetime.now()
    updated_at: datetime.datetime = datetime.datetime.now()

    def to_dict(self):
        return {
            'id': self.id,
            'words': self.words,
            'textFiles': [text_file.to_dict() for text_file in self.text_files],
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


def new_consistency_result() -> ConsistencyResult:
    return ConsistencyResult(
        id=str(uuid.uuid4()),
        words=[],
        text_files=[],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

def make_word_count_dict(doc: spacy.tokens.Doc):
    word_count_dict: dict[str, int] = {}
    for token in doc:
        if token.is_alpha:
            word = token.text.lower()
            if word in word_count_dict:
                word_count_dict[word] += 1
            else:
                word_count_dict[word] = 1
    return word_count_dict

# limit: 上位何単語までを比較するか
def consistency_k_vs_k(text_files: List[TextFile], limit: int) -> ConsistencyResult:
    result = new_consistency_result()

    # 全ファイルで共通で使われている単語が上位に来るように、各ファイルの単語数をカウントする

    # 各ファイルの単語数をカウントする
    word_counts: dict[str, dict[str, int]] = {}
    for text_file in text_files:
        doc = nlp(text_file.content)
        word_counts[text_file.id] = make_word_count_dict(doc)
    
    # 各単語の、出現ファイル数と、出現回数をカウントする
    common_words: dict[str, tuple[int, int]] = {}
    for text_file in text_files:
        for word in word_counts[text_file.id]:
            if word in common_words:
                common_words[word] = (common_words[word][0] + 1, common_words[word][1] + word_counts[text_file.id][word])
            else:
                common_words[word] = (1, word_counts[text_file.id][word])
    
    # 出現ファイル数が多い順、出現回数が多い順にソートする
    sorted_common_words = sorted(common_words.items(), reverse=True, key=lambda x: (x[1][0], x[1][1]))

    # 上位limit個の単語を取得
    top_words = [word for word, _ in sorted_common_words[:limit]]
    result.words = top_words

    # 各ファイルの上位limit個の単語の出現回数を取得
    for text_file in text_files:
        word_count_list = []
        for word in top_words:
            if word in word_counts[text_file.id]:
                word_count_list.append(word_counts[text_file.id][word])
            else:
                word_count_list.append(0)
        result.text_files.append(ConsistencyTextFile(text_file.id, text_file.name, word_count_list))
    
    return result