import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Header from '../../components/Header';

import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Content,
  Schedule,
  MyPackages,
  Section,
  Packages,
  Calendar,
} from './styles';

import api from '../../services/api';

interface Package {
  id: string;
  name: string;
  created_at: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [packages, setPackages] = useState<Package[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get<Package[]>('packages/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => {
        const packagesFormatted = data.map(singlePackage => {
          return {
            ...singlePackage,
            hourFormatted: format(parseISO(singlePackage.created_at), 'HH:mm'),
          };
        });
        
        setPackages(packagesFormatted);
      });
  }, [selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBr,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBr,
    });
  }, [selectedDate]);

  const morningPackages = useMemo(() => {
    return packages.filter(singlePackage => {
      return parseISO(singlePackage.created_at).getHours() < 12;
    });
  }, [packages]);

  const afternoonPackages = useMemo(() => {
    return packages.filter(singlePackage => {
      return parseISO(singlePackage.created_at).getHours() >= 12;
    });
  }, [packages]);

  return (
    <Container>
      <Header />

      <Content>
        <Schedule>
          <MyPackages>
            <h1>Meus pacotes</h1>
            
            <Link to="/new-package">Criar um pacote</Link>
          </MyPackages>
          
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <Section>
            <strong>Manhã</strong>

            {morningPackages.length === 0 && (
              <p>Nenhum pacote neste período</p>
            )}

            {morningPackages.map(singlePackage => (
              <Packages key={singlePackage.id}>
                <span>
                  <FiClock />
                  {singlePackage.hourFormatted}
                </span>

                <div>
                  <img
                    src={singlePackage.user.avatar_url}
                    alt={singlePackage.user.name}
                  />
                  <strong>{singlePackage.name}</strong>
                </div>
              </Packages>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonPackages.length === 0 && (
              <p>Nenhum pacote neste período</p>
            )}

            {afternoonPackages.map(singlePackage => (
              <Packages key={singlePackage.id}>
                <span>
                  <FiClock />
                  {singlePackage.hourFormatted}
                </span>

                <div>
                  <img
                    src={singlePackage.user.avatar_url}
                    alt={singlePackage.user.name}
                  />
                  <strong>{singlePackage.name}</strong>
                </div>
              </Packages>
            ))}
          </Section>

        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            // disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
