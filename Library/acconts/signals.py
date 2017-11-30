from acconts.models import Account
from django.db.models.signals import pre_delete,post_save

def d(sender,**kwargs):
    print('deleting')

pre_delete.connect(d,sender=Account)

post_save.connect(d,sender=Account)

