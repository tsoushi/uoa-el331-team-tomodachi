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
