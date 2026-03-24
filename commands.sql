CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Immanuel Kant', 'www.germanphilosphy.com', 'Critique')

insert into blogs (url, title, likes) values ('sequelize.org.com', 'Model Basics', 2)