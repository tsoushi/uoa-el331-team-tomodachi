from dataclasses import dataclass
from typing import List

import datetime
import uuid

import spacy

from .text_file import TextFile

nlp = spacy.load('en_core_web_sm')

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
    result=new_exploratory_search_result(word)
    # TODO: 各TextFileに対して検索を行う
    # 結果はそれぞれsearch_termsにappendしていく
    for text_file in text_files:
        # TODO: 検索結果それぞれに対して左右の単語を取得し、left_words, right_wordsに格納する
        doc=nlp(text_file.content)
        get_left_words=[]
        get_right_words=[]
        for i, token in enumerate(doc):
          if token.is_alpha == False:
            continue
          w = token.text
          if w == word:
              get_left_words=[item.text for item in doc[max(0, i - 20):i]]
              get_right_words=[item.text for item in doc[i + 1:min(len(doc), i + 21)]]

              result.search_terms.append(
                ExploratorySearchTerm(
                    text_file_id=text_file.id,
                    text_name=text_file.name,
                    left_words=get_left_words,
                   right_words=get_right_words
               )
        )
    
    return result