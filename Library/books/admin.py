from django.contrib import admin
from .models import BookTags,BookDetails,Books
# Register your models here.

admin.site.register(Books)
admin.site.register(BookDetails)
admin.site.register(BookTags)
