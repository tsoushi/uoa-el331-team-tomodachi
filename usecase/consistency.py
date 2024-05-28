import database
import domain

from typing import List

def consistency_k_vs_k(text_file_ids: List[str], limit: int) -> domain.ConsistencyResult:
    text_files = database.get_text_file_multi(text_file_ids)
    return domain.consistency_k_vs_k(text_files, limit)