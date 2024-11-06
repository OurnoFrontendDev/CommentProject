const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(express.json());
// app.use('/icons', express.static(path.join(__dirname, 'src/icons')));

const adapter = new FileSync(path.join(__dirname, 'db.json'));

const db = low(adapter);

app.post('/comments', (req, res) => {
  const { content, username, avatarUrl, userId, parentId } = req.body;

  const newComment = {
    id: uuidv4(),
    content,
    username,
    avatarUrl: avatarUrl || '/icons/default-avatar.jpg',
    userId: userId || null,
    parentId: parentId || null,
    createdAt: new Date().toISOString(),
    like: 0,
    dislike: 0,
  };
  db.get('comments').push(newComment).write();
  console.log('Добавлен новый комментарий:', newComment);
  res.status(201).json(newComment);
});

app.get('/comments', (req, res) => {
  const comments = db.get('comments').value();
  res.json(comments);
});
app.post('/comments/:id/like', (req, res) => {
  const { id } = req.params;
  const { like } = req.body;

  const comment = db.get('comments').find({ id }).value();

  if (comment) {
    comment.like = like;

    db.get('comments').find({ id }).assign(comment).write();
    console.log(`Обновлена реакция для комментария с ID ${id}:`, comment);

    // Возвращаем весь массив комментариев
    const allComments = db.get('comments').value();
    res.json(allComments);
  } else {
    console.log(`Комментарий с ID ${id} не найден`);
    res.status(404).json({ error: 'Комментарий не найден' });
  }
});

app.post('/comments/:id/dislike', (req, res) => {
  const { id } = req.params;
  const { dislike } = req.body;

  const comment = db.get('comments').find({ id }).value();

  if (comment) {
    comment.dislike = dislike; // Update the dislike count

    db.get('comments').find({ id }).assign(comment).write();
    console.log(`Dislike updated for comment with ID ${id}:`, comment);

    const allComments = db.get('comments').value();
    res.json(allComments);
  } else {
    console.log(`Comment with ID ${id} not found`);
    res.status(404).json({ error: 'Comment not found' });
  }
});
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Received ID for deletion: ${id}`);

  const commentToDelete = db.get('comments').find({ id }).value();

  if (commentToDelete) {
    db.get('comments').remove({ id }).write();
    console.log(`Комментарий с ID ${id} удалён`);
    res.status(200).json({ message: 'Комментарий удалён' });
  } else {
    console.log(`Комментарий с ID ${id} не найден`);
    res.status(404).json({ error: 'Комментарий не найден' });
  }
});

app.post('/comments/:parentId/reply', (req, res) => {
  const { parentId } = req.params;
  const { content, username,  avatarUrl, userId } = req.body;

  const parentComment = db.get('comments').find({ id: parentId }).value();

  if (!parentComment) {
    return res
      .status(404)
      .json({ error: 'Родительский комментарий не найден' });
  }

  const reply = {
    id: uuidv4(),
    content,
    username,
    avatarUrl: avatarUrl || '/icons/default-avatar.jpg',
    userId: userId || null,
    parentId: parentId,
    createdAt: new Date().toISOString(),
    like: 0,
    dislike: 0,
  };

  db.get('comments').push(reply).write();

  console.log(`Добавлен новый ответ на комментарий с ID ${parentId}:`, reply);
  res.status(201).json(reply);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
