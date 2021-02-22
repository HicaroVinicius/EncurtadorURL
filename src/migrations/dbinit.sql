CREATE TABLE IF NOT EXISTS
                    encurtador
                    (
                    id serial NOT NULL,
                    encurtado text NOT NULL,
                    time   timestamp    NOT NULL,
                    url text NOT NULL,
                    PRIMARY KEY (id)
                    )