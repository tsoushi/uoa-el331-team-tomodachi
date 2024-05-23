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


def new_consistency_result(words: List[str]) -> ConsistencyResult:
    return ConsistencyResult(
        id=str(uuid.uuid4()),
        words=words,
        text_files=[],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

# limit: 上位何単語までを比較するか
def consistency_k_vs_k(text_files: List[TextFile], limit: int) -> ConsistencyResult:
    result = new_consistency_result([text_file.name for text_file in text_files])

    # 全ファイルで共通で使われている単語が上位に来るように、各ファイルの単語数をカウントする

    return result