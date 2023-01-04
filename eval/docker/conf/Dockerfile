FROM nginx:1.16.1

COPY src/sites /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY foo.conf /etc/nginx/sites-available/foo.conf
COPY conf/mime.types /etc/nginx/mime.types
RUN mkdir /etc/nginx/sites-enabled/
RUN rm -f /etc/nginx/sites-available/default
RUN ln -s /etc/nginx/sites-available/foo.conf /etc/nginx/sites-enabled/foo.conf
RUN mkdir /etc/nginx/logs
RUN touch /etc/nginx/logs/localhost.access.log
RUN rm -f /etc/nginx/conf.d/default.conf

EXPOSE 85