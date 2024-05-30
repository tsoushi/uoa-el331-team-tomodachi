import database
import domain

from typing import List

def search_by_word(text_file_ids: List[str], word: str) -> domain.ExploratorySearchResult:
    text_files = database.get_text_file_multi(text_file_ids)
    return domain.exploratory_search_by_word(text_files, word)