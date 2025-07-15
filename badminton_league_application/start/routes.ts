import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.group(() => {
  router.post('/register', 'AuthController.register')
  router.post('/login', 'AuthController.login')
  router.post('/logout', 'AuthController.logout').middleware('auth')
}).prefix('/api/auth')

router.group(() => {
  router.get('/', 'PlayersController.index')
  router.post('/', 'PlayersController.store')
  router.get('/:id', 'PlayersController.show')
  router.put('/:id', 'PlayersController.update')
  router.delete('/:id', 'PlayersController.destroy')
})
  .prefix('/api/players')
  .middleware(['auth'])

  router.group(() => {
  router.get('/', 'MatchController.index')
  router.post('/', 'MatchController.store')
  router.get('/:id', 'MatchController.show')
  router.delete('/:id', 'MatchController.destroy')
})
  .prefix('/api/matches')
  .middleware(['auth'])

  router.group(() => {
  router.get('/', 'UserController.index')
  router.post('/', 'UserController.store')
  router.get('/:id', 'UserController.show')
  router.put('/:id', 'UserController.update')
  router.delete('/:id', 'UserController.destroy')
})
  .prefix('/api/users')
  .middleware(['auth'])


  router.post('/register', 'AuthController.register')
  router.post('/login', 'AuthController.login')

router.group(() => {
  router.resource('players', 'PlayerController').apiOnly()
  router.resource('matches', 'MatchController').apiOnly()
  router.get('leaderboard', 'LeaderboardController.index')
}).middleware('auth')

router.get('/api/leaderboard', 'LeaderboardController.index').middleware(['auth'])
