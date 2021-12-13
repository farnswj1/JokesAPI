from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task
from core.models import User
from jokes.models import Joke
import logging

logger = logging.getLogger(__name__)


@shared_task(name="jokes.email_staff_about_new_joke")
def email_staff_about_new_joke(id):
    joke = Joke.objects.get(id=id)
    staff = User.objects.filter(is_staff=True).values_list("email", flat=True)

    subject = "New Joke Created!"
    message = f"""
    A new joke has been created!\n
    \n
    ID: {joke.id}\n
    Title: {joke.title}\n
    Body: {joke.body}
    """
    from_email = settings.EMAIL_HOST_USER

    send_mail(subject, message, from_email, staff, fail_silently=True)


@shared_task(name="jokes.email_staff_about_updated_joke")
def email_staff_about_updated_joke(id):
    joke = Joke.objects.get(id=id)
    staff = User.objects.filter(is_staff=True).values_list("email", flat=True)

    subject = "A Joke Was Updated!"
    message = f"""
    A joke has been updated!\n
    \n
    ID: {joke.id}\n
    Title: {joke.title}\n
    Body: {joke.body}
    """
    from_email = settings.EMAIL_HOST_USER

    send_mail(subject, message, from_email, staff, fail_silently=False)


@shared_task(name="jokes.email_staff_about_deleted_joke")
def email_staff_about_deleted_joke(joke):
    staff = User.objects.filter(is_staff=True).values_list("email", flat=True)

    subject = "A Joke Was Deleted!"
    message = f"""
    A joke has been deleted!\n
    \n
    ID: {joke.get("id")}\n
    Title: {joke.get("title")}\n
    Body: {joke.get("body")}
    """
    from_email = settings.EMAIL_HOST_USER

    send_mail(subject, message, from_email, staff, fail_silently=False)
