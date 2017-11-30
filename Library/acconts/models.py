from django.db import models
from userprofile.models import UserProfile
from books.models import Books
# Create your models here.
from django.db.models.signals import pre_delete, post_save
from django.shortcuts import get_object_or_404


class Account(models.Model):

    student=models.ForeignKey(UserProfile,related_name='stud')
    book=models.ForeignKey(Books,related_name='b')
    data=models.DateTimeField(auto_now_add=True)

    def save(self,*args,**kwargs):
        print('saving')
        self.book.available=False
        self.book.save()
        super(Account,self).save(*args,**kwargs)
    def __str__(self):
        return str(self.book)



def returnbook(sender, **kwargs):
    s=kwargs['instance']
    s=s.book
    s.available=True
    s.save()
    print(s.available)
    print(s.id)
def takebook(sender,**kwargs):
    s = kwargs['instance']
    s = s.book
    s.available = False
    s.save()


pre_delete.connect(returnbook, sender=Account)
post_save.connect(takebook,sender=Account)