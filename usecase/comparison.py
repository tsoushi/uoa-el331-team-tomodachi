import database
import domain

def compare(q_text_file_id: str, k_text_file_id: str) -> domain.ComparisonResult:
    q_text_file = database.get_text_file(q_text_file_id)
    k_text_file = database.get_text_file(k_text_file_id)
    return domain.compare(q_text_file, k_text_file)