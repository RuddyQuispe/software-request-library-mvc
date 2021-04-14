-- ******** CREACION DEL USUARIO O ROL ******** 

CREATE ROLE biblioteca_municipal
   WITH
   LOGIN
   INHERIT
   REPLICATION
   CONNECTION LIMIT -1
   PASSWORD 'b6200836-fea7-4a86-9d33-107d08655f33';

-- ********* CREACION DE LA BD *************
CREATE DATABASE biblioteca_municipal
   with owner=biblioteca_municipal
   encoding='UTF8'
   tablespace=pg_default
   CONNECTION LIMIT=-1;

-- ********* IMPLEMENTACION DE LA BASE DE DATOS *****************
create table usuario_lector(
	ci integer not null primary key,
	nombre text not null,
	apellidos text not null,
	email text not null,
	telefono varchar(9) not null
);

create table usuario_admin(
	codigo serial not null primary key,
	nombre text not null,
	apellido text not null,
	email text not null
);

create table categoria(
	id serial not null primary key,
	descripcion text not null
);

create table libro(
	codigo serial not null primary key,
	autor text not null,
	titulo text not null,
	descripcion text not null,
	edicion text not null,
	stock integer not null,
	estado boolean not null,
	id_categoria integer not null,
	foreign key (id_categoria) references categoria(id)
	on update cascade
	on delete cascade
);

create table solicitud_prestamo(
	nro_solicitud serial primary key,
	fecha date not null,
	cant_dias_prestamo integer not null, -- 1 a 7 dias maximo
	estado char(1) not null, -- 0:rechazado 1:acepado: 2:en espera
	ci_usuario_lector integer not null,
	codigo_usuario_admin integer null,
	foreign key (ci_usuario_lector) references usuario_lector(ci)
	on update cascade
	on delete cascade,
	foreign key (codigo_usuario_admin) references usuario_admin(codigo)
	on update cascade
	on delete cascade
);

-- se registrara un maximo de 5 libros por solicitud
create table caja_libros(
	nro_solicitud integer not null,
	codigo_libro integer not null,
	primary key (nro_solicitud, codigo_libro),
	foreign key (nro_solicitud) references solicitud_prestamo(nro_solicitud)
	on update cascade
	on delete cascade,
	foreign key (codigo_libro) references libro(codigo)
	on update cascade
	on delete cascade
);