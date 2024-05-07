from repository import Repository

class TXTFile:
    def __init__(self, repo: Repository):
        self.repo: Repository = repo

    def create(self, name: str, content: str) -> None:
        self.repo.txt_file.create(name, content)
