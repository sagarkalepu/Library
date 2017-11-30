from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.
class BookTags(models.Model):
    tags=models.CharField(max_length=20)

    def __str__(self):
        return str(self.tags)

class BookDetails(models.Model):

    tag=models.ManyToManyField(BookTags,related_name='taags')
    title=models.CharField(max_length=50)
    author=models.CharField(max_length=20)
    description=models.TextField(blank=True)
    total=10
    def __str__(self):
        return str(self.title)
    def copies(self,no_of_copies):
        for i in range(0,no_of_copies):
            b=Books()
            b.book_details=self
            b.available=True
            b.save()


class Books(models.Model):
    book_details=models.ForeignKey(BookDetails,related_name='book')
    available=models.BooleanField()


    def __str__(self):
        return str(self.id)


