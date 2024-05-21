from dataclasses import dataclass
from typing import List

import datetime
import uuid

from .text_file import TextFile

@dataclass
class ComparisonTerm:
    rank: int # 1~
    word: str
    count_q: int
    count_k: int


@dataclass
class ComparisonResult:
    id: str
    q_text_file_id: str
    q_text_file_name: str
    k_text_file_id: str
    k_text_file_name: str
    terms: List[ComparisonTerm]
    created_at: datetime.datetime
    updated_at: datetime.datetime

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'qTextFileId': self.q_text_file_id,
            'qTextFileName': self.q_text_file_name,
            'kTextFileId': self.k_text_file_id,
            'kTextFileName': self.k_text_file_name,
            'terms': [
                {
                    'rank': term.rank,
                    'word': term.word,
                    'countQ': term.count_q,
                    'countK': term.count_k
                } for term in self.terms
            ],
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

def new_comparison_result(q_text_file: TextFile, k_text_file: TextFile) -> ComparisonResult:
    return ComparisonResult(
        id=str(uuid.uuid4()),
        q_text_file_id=q_text_file.id,
        q_text_file_name=q_text_file.name,
        k_text_file_id=k_text_file.id,
        k_text_file_name=k_text_file.name,
        terms=[],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

def compare_q_vs_k(q_text_file: TextFile, k_text_file: TextFile) -> ComparisonResult:
    comparison_result = new_comparison_result(q_text_file, k_text_file)

    # TODO: 以下を実装
    # qとkのテキストファイルに含まれている単語のうち、出現回数が多い順に比較結果を作成する
    # 指示されているタスクでは、20件ずつユーザーからのリクエストがあるたびに比較結果を返すことが求められているが、一旦上位20件の比較結果のみを返すように実装する

    # qとkのテキストファイルに含まれている単語のうち、出現回数が多い20の単語を求めて、termsにComparisonTermを追加する
    comparison_result.terms.append(
        ComparisonTerm(
            rank=1, # 1~20位までの順位
            word="", # 単語
            count_q=1, # qのテキストファイルでの単語の出現回数
            count_k=2 # kのテキストファイルでの単語の出現回数
        )
    )
    # これを1~20位まで繰り返す

    return comparison_result