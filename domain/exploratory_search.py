from dataclasses import dataclass
from typing import List

import datetime
import uuid

from .text_file import TextFile

@dataclass
class ExploratorySearchTerm:
    text_file_id: str
    text_name: str
    left_words: List[str]
    right_words: List[str]

@dataclass
class ExploratorySearchResult:
    id: str
    target_word: str # 検索対象の単語
    search_terms: List[ExploratorySearchTerm] # 検索結果のリスト
    created_at: datetime.datetime
    updated_at: datetime.datetime

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'targetWord': self.target_word,
            'searchTerms': [
                {
                    'textFileId': term.text_file_id,
                    'textFileName': term.text_name,
                    'leftWords': term.left_words,
                    'rightWords': term.right_words
                } for term in self.search_terms
            ],
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

def new_exploratory_search_result(target_word: str) -> ExploratorySearchResult:
    return ExploratorySearchResult(
        id=str(uuid.uuid4()),
        target_word=target_word,
        search_terms=[],
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )


def exploratory_search_by_word(text_files: List[TextFile], word: str) -> ExploratorySearchResult:
    result = new_exploratory_search_result(word)
    # TODO: 各TextFileに対して検索を行う
    # 結果はそれぞれsearch_termsにappendしていく
    for text_file in text_files:
        # TODO: 検索結果それぞれに対して左右の単語を取得し、left_words, right_wordsに格納する
        result.search_terms.append(
            ExploratorySearchTerm(
                text_file_id=text_file.id,
                text_name=text_file.name,
                left_words=[],
                right_words=[]
            )
        )
    
    return result