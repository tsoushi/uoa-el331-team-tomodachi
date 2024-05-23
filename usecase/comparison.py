import database
import domain

def compare_q_vs_k(q_text_file_id: str, k_text_file_id: str) -> domain.ComparisonResult:
    q_text_file = database.get_text_file(q_text_file_id)
    k_text_file = database.get_text_file(k_text_file_id)
    return domain.compare_q_vs_k(q_text_file, k_text_file)