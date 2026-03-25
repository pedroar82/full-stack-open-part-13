-- Exercise: 2. Console connection

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Immanuel Kant', 'www.germanphilosphy.com', 'Critique')

insert into blogs (url, title, likes) values ('sequelize.org.com', 'Model Basics', 2)

-- Exercise: 8. Let there be users

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    username text NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);