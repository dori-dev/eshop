from django.core.mail import EmailMessage
from django.conf import settings
from django.utils.timezone import now

from accounts.models import OtpCode, User


def send_email(subject, body, to):
    if isinstance(to, str):
        to = [to]
    try:
        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.EMAIL_HOST_USER,
            to=to,
        )
        email.send()
        return True
    except Exception:
        False


def check_otp_expiration(otp: OtpCode):
    otp_time = otp.created_at
    diff = now() - otp_time
    if diff.seconds > (5 * 60):
        return False
    return True


def validate_otp(user: User, code: str):
    otp_qs = OtpCode.objects.filter(email=user.email)
    if not otp_qs.exists():
        return False
    otp = otp_qs.first()
    if otp.code != code:
        return False
    return check_otp_expiration(otp)
