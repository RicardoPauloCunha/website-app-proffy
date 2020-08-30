import React, { useState, FormEvent, useEffect } from 'react';
import debounce from 'lodash.debounce';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [newSearch, setNewSearch] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        getTeachers();
    }, []);

    async function getTeachers(e?: FormEvent) {
        e?.preventDefault();

        setIsLoading(true);

        let params = null;
        let currentPage = newSearch ? 0 : teachers.length

        if (newSearch || searching) {
            params = {
                page: currentPage,
                limit: 5,
                subject,
                week_day,
                time
            };

            if (!searching)
                setSearching(true);

            if (newSearch)
                setHasMore(true);
        }
        else {
            if (!hasMore) return;

            params = {
                page: currentPage,
                limit: 5
            };
        }

        api.get('classes', {
            params
        })
            .then(response => {
                let newTeachers = response.data as Array<Teacher>;

                if (newTeachers.length !== 0) {
                    if (newSearch)
                        setTeachers([...newTeachers]);
                    else
                        setTeachers([...teachers, ...newTeachers]);
                }
                else if (newTeachers.length === 0 && newSearch)
                    setTeachers([]);
                else
                    setHasMore(false);

                setIsLoading(false);
                setNewSearch(false);
            })
            .catch(() => {
                setIsLoading(false);
                setHasMore(true);
            });
    }

    window.onscroll = debounce(() => {
        if (isLoading || !hasMore) return;

        const body = document.body;
        const html = document.documentElement;

        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;

        const windowBottom = windowHeight + window.pageYOffset + 170;
        if (windowBottom >= docHeight) {
            getTeachers();
        }
    }, 100);

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                title="Estes são os proffys disponíveis."
                page="Estudar"
            >
                <form action="" id="search-teachers" onSubmit={getTeachers}>
                    <Select
                        name="subject" label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: "Artes", label: "Artes" },
                            { value: "Biologia", label: "Biologia" },
                            { value: "Ciência", label: "Ciência" },
                            { value: "E. Física", label: "E. Física" },
                            { value: "Inglês", label: "Inglês" },
                            { value: "Matemática", label: "Matemática" },
                            { value: "Português", label: "Português" },
                            { value: "Geográfia", label: "Geográfia" },
                            { value: "História", label: "História" }
                        ]}
                    />

                    <Select
                        name="week_day" label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeek_day(e.target.value)}
                        options={[
                            { value: "1", label: "Segunda-feira" },
                            { value: "2", label: "Terça-feira" },
                            { value: "3", label: "Quarta-feira" },
                            { value: "4", label: "Quinta-feira" },
                            { value: "5", label: "Sexta-feira" },
                        ]}
                    />

                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />

                    <button type="submit" onClick={() => setNewSearch(true)}>Buscar</button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher} />
                    })
                }
            </main>

            <footer>
                {
                    isLoading && <span>Carregando...</span>
                }
                {
                    (!hasMore && teachers.length !== 0 && !isLoading) && <span>Estes são todos os resultados</span>
                }
                {
                    (hasMore && !isLoading && teachers.length !== 0 && !isLoading) && <span>+ Mais proffys</span>
                }
                {
                    (teachers.length === 0 && !isLoading) && <span>Nenhum professor encontrado <br />
                    com sua pesquisa.</span>
                }
            </footer>
        </div>
    )
}

export default TeacherList;