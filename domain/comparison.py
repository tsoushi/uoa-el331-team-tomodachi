from dataclasses import dataclass
from typing import List

import datetime
import uuid

import spacy

from .text_file import TextFile

nlp = spacy.load('en_core_web_sm')

@dataclass
class WordRank:
    rank: int # 1~
    word: str
    count: int

    def to_dict(self):
        return {
            'rank': self.rank,
            'word': self.word,
            'count': self.count
        }

@dataclass
class CompareQvsKsTerm:
    offset: int # 1, 21, 41, ...
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
            'k_text_file_id': self.k_text_file_id,
            'k_text_file_name': self.k_text_file_name,
            'terms': [term.to_dict() for term in self.terms]
        }

@dataclass
class CompareQvsKsResult:
    id: str
    q_text_file_id: str
    q_text_file_name: str
    terms: List[CompareQvsKsTerm]
    k_text_files: List[CompareQvsKsKTextFile]

    def to_dict(self):
        return {
            'id': self.id,
            'q_text_file_id': self.q_text_file_id,
            'q_text_file_name': self.q_text_file_name,
            'terms': [term.to_dict() for term in self.terms],
            'k_text_files': [k_text_file.to_dict() for k_text_file in self.k_text_files]
        }

def new_compare_q_vs_ks_result(q_text_file: TextFile) -> CompareQvsKsResult:
    return CompareQvsKsResult(
        id=str(uuid.uuid4()),
        q_text_file_id=q_text_file.id,
        q_text_file_name=q_text_file.name,
        terms=[],
        k_text_files=[]
    )


def compare_q_vs_k(q_text_file: TextFile, k_text_files: List[TextFile]) -> CompareQvsKsResult:
    result = new_compare_q_vs_ks_result(q_text_file)

    result.terms = [
        CompareQvsKsTerm(
            offset=1,
            words=[
                WordRank(rank=1, word='word1', count=100),
                WordRank(rank=2, word='word2', count=97),
                WordRank(rank=3, word='word3', count=89),
                # ... 4 ~ 19 ...
                WordRank(rank=20, word='word20', count=1)
            ]
        ),
        # offset 21, 41, ...
    ]

    for k_text_file in k_text_files:
        terms = []
        result.k_text_files.append(
            CompareQvsKsKTextFile(
                k_text_file_id=k_text_file.id,
                k_text_file_name=k_text_file.name,
                terms=terms
            )
        )
    
    return result