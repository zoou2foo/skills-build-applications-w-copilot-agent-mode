from django.db import models
from django.contrib.auth.models import AbstractUser

# Team model
class Team(models.Model):
	name = models.CharField(max_length=100, unique=True)
	def __str__(self):
		return self.name

# Custom User model
class User(AbstractUser):
	email = models.EmailField(unique=True)
	team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='members')

# Activity model
class Activity(models.Model):
	ACTIVITY_TYPES = [
		('run', 'Run'),
		('cycle', 'Cycle'),
		('swim', 'Swim'),
		('other', 'Other'),
	]
	user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='activities')
	type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
	duration = models.PositiveIntegerField(help_text='Duration in minutes')
	timestamp = models.DateTimeField(auto_now_add=True)

# Workout model
class Workout(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	def __str__(self):
		return self.name

# Leaderboard model
class Leaderboard(models.Model):
	user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='leaderboard_entries')
	score = models.IntegerField()
	def __str__(self):
		return f'{self.user.username}: {self.score}'
