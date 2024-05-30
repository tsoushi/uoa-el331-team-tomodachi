import domain
import database

from typing import List, Optional

def create(name: str, content: str) -> domain.TextFile:
    text_file = domain.new_text_file(name, content)
    return database.create_text_file(text_file)

def get(text_file_id: str) -> Optional[domain.TextFile]:
    return database.get_text_file(text_file_id)

def update(text_file_id: str, name: str, content: str) -> domain.TextFile:
    text_file = database.get_text_file(text_file_id)
    # TODO: TextFileが存在しない場合のエラーハンドリング
    text_file.update(name, content)
    return database.update_text_file(text_file)

def delete(text_file_id: str) -> str:
    database.delete_text_file(text_file_id) # TODO: 存在しないTextFileを削除しようとした場合のエラーハンドリング
    return text_file_id

def get_all() -> List[domain.TextFile]:
    return database.get_all_text_files()