from typing import List

import database
import domain

def compare_q_vs_k(q_text_file_id: str, k_text_file_ids: List[str]) -> domain.ComparisonResult:
    q_text_file = database.get_text_file(q_text_file_id)
    k_text_files = database.get_text_file_multi(k_text_file_ids)
    return domain.compare_q_vs_k(q_text_file, k_text_files)