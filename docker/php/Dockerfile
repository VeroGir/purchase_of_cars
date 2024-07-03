FROM php:8.2-fpm
RUN apt-get update && apt-get install -y \
		libfreetype-dev \
		libjpeg62-turbo-dev \
        zlib1g-dev unzip libzip-dev \
		libpng-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd

RUN apt-get update && apt-get install -y \
        libpq-dev \
    && docker-php-ext-configure pgsql \
    && docker-php-ext-install pdo_pgsql

COPY --from=composer /usr/bin/composer /usr/bin/composer

ADD php.ini /usr/local/etc/php/conf.d/custom.ini