from dataclasses import dataclass

@dataclass
class TXTFile:
    filename: str
    content: str
    