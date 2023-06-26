from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from accounts import models


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(
        label='Password',
        widget=forms.PasswordInput,
    )
    password2 = forms.CharField(
        label='Confirm Password',
        widget=forms.PasswordInput,
    )

    class Meta:
        model = models.User
        fields = [
            'email',
            'name',
        ]

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise ValidationError("Confirm password don't match")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data.get('password1'))
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(
        help_text=(
            'You can change password using'
            ' <a href="../password/">this form</a>.'
        ),
    )

    class Meta:
        model = models.User
        fields = [
            'email',
            'name',
            'password',
            'last_login',
        ]
