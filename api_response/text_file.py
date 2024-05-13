import domain

from typing import Optional

# POST: /file
def post(text_file: domain.TextFile) -> dict[str, any]:
    return {
        'message': 'success',
        'textFile': {
            'filename': text_file.filename,
            'content': text_file.content
        }
    }
    
# GET: /file
def get(text_file: Optional[domain.TextFile]) -> dict[str, any]:
    if text_file is None:
        return {
            'message': 'not found'
        }
    
    return {
        'message': 'success',
        'textFile': {
            'filename': text_file.filename,
            'content': text_file.content
        }
    }