from repository import Repository

from repository.txt_file import TXTFile

class Usecase:
    def __init__(self, repo: Repository):
        self.repo: Repository = repo
        self.txt_file = TXTFile(repo)