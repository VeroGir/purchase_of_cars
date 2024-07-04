FROM php:8.2-fpm
RUN apt-get update && apt-get install -y \
		libfreetype-dev \
		libjpeg62-turbo-dev \
        zlib1g-dev unzip libzip-dev \
		libpng-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd

COPY --from=composer /usr/bin/composer /usr/bin/composer

ADD php.ini /usr/local/etc/php/conf.d/custom.ini