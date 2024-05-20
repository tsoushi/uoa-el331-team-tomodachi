from dataclasses import dataclass

import datetime
import uuid

@dataclass
class TextFile:
    id: str
    name: str
    content: str
    created_at: datetime.datetime
    updated_at: datetime.datetime

    def update(self, name: str, content: str):
        self.name = name
        self.content = content
        self.updated_at = datetime.datetime.now()
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'content': self.content,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

def new_text_file(name: str, content: str) -> TextFile:
    return TextFile(
        id=str(uuid.uuid4()),
        name=name,
        content=content,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )