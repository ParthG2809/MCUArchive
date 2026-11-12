from django.conf import settings
from django.db import models


class WatchedTitle(models.Model):
    """One title a member has marked as watched.

    `title_id` is the id used in js/data/*.js (e.g. "iron-man"). The catalogue lives in the frontend,
    so ids are checked for shape here, not against the data files."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="watched_titles")
    title_id = models.CharField(max_length=80)
    watched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["user", "title_id"], name="unique_watched_title_per_user")]
        ordering = ["watched_at"]

    def __str__(self):
        return f"{self.user} watched {self.title_id}"
