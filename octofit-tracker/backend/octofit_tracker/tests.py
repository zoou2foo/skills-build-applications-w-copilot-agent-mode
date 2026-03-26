from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Team, User, Activity, Workout, Leaderboard

class APIRootTest(APITestCase):
	def test_api_root(self):
		url = reverse('api-root')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

class TeamTest(APITestCase):
	def test_create_team(self):
		url = '/api/teams/'
		data = {'name': 'Test Team'}
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class UserTest(APITestCase):
	def test_create_user(self):
		team = Team.objects.create(name='Test Team')
		url = '/api/users/'
		data = {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpass123', 'team': team.id}
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ActivityTest(APITestCase):
	def test_create_activity(self):
		team = Team.objects.create(name='Test Team')
		user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123', team=team)
		url = '/api/activities/'
		data = {'user': user.id, 'type': 'run', 'duration': 30}
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class WorkoutTest(APITestCase):
	def test_create_workout(self):
		url = '/api/workouts/'
		data = {'name': 'Test Workout', 'description': 'Test desc'}
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class LeaderboardTest(APITestCase):
	def test_create_leaderboard(self):
		team = Team.objects.create(name='Test Team')
		user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123', team=team)
		url = '/api/leaderboard/'
		data = {'user': user.id, 'score': 42}
		response = self.client.post(url, data)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
