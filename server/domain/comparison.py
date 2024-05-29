from dataclasses import dataclass
from typing import List

import datetime
import uuid

import spacy
import spacy.tokens

from .text_file import TextFile

nlp = spacy.load('en_core_web_sm')

@dataclass
class WordRank:
    word: str
    count: int

    def to_dict(self):
        return {
            'word': self.word,
            'count': self.count
        }

@dataclass
class CompareQvsKsTerm:
    offset: int # 0, 20, 40, ...
    words: List[WordRank]

    def to_dict(self):
        return {
            'offset': self.offset,
            'words': [word.to_dict() for word in self.words]
        }

@dataclass
class CompareQvsKsKTextFile:
    k_text_file_id: str
    k_text_file_name: str
    terms: List[CompareQvsKsTerm]

    def to_dict(self):
        return {
            'kTextFileID': self.k_text_file_id,
            'kTextFileName': self.k_text_file_name,
            'terms': [term.to_dict() for term in self.terms]
        }

@dataclass
class CompareQvsKsResult:
    id: str
    q_text_file_id: str
    q_text_file_name: str
    terms: List[CompareQvsKsTerm]
    k_text_files: List[CompareQvsKsKTextFile]
    created_at: datetime.datetime = datetime.datetime.now()
    updated_at: datetime.datetime = datetime.datetime.now()

    def to_dict(self):
        return {
            'id': self.id,
            'qTextFileID': self.q_text_file_id,
            'qTextFileName': self.q_text_file_name,
            'terms': [term.to_dict() for term in self.terms],
            'kTextFiles': [k_text_file.to_dict() for k_text_file in self.k_text_files]
        }

def new_compare_q_vs_ks_result(q_text_file: TextFile) -> CompareQvsKsResult:
    return CompareQvsKsResult(
        id=str(uuid.uuid4()),
        q_text_file_id=q_text_file.id,
        q_text_file_name=q_text_file.name,
        terms=[],
        k_text_files=[],
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

def compare_q_vs_k(q_text_file: TextFile, k_text_files: List[TextFile]) -> CompareQvsKsResult:
    result = new_compare_q_vs_ks_result(q_text_file)

    q_word_count = make_word_count_dict(nlp(q_text_file.content))
    q_word_count_list = sorted(q_word_count.items(), key=lambda x: x[1], reverse=True)

    q_word_ranks = []
    for i, (word, count) in enumerate(q_word_count_list):
        q_word_ranks.append(
            WordRank(
                word=word,
                count=count
            )
        )
    
    # 全単語の出現回数を20単語ずつに分割
    for i in range(0, len(q_word_ranks), 20):
        result.terms.append(
            CompareQvsKsTerm(
                offset=i,
                words=q_word_ranks[i:i + 20]
            )
        )

    for k_text_file in k_text_files:
        terms = []
        k_word_count_dict = make_word_count_dict(nlp(k_text_file.content))
        for i in range(0, len(q_word_ranks), 20):
            words = []
            for j in range(i, i + 20):
                if j >= len(q_word_ranks):
                    break
                word = q_word_ranks[j].word
                if word in k_word_count_dict:
                    words.append(
                        WordRank(
                            word=word,
                            count=k_word_count_dict[word]
                        )
                    )
            words = sorted(words, key=lambda x: x.count, reverse=True)
            terms.append(
                CompareQvsKsTerm(
                    offset=i,
                    words=words
                )
            )
        result.k_text_files.append(
            CompareQvsKsKTextFile(
                k_text_file_id=k_text_file.id,
                k_text_file_name=k_text_file.name,
                terms=terms
            )
        )
    
    return result