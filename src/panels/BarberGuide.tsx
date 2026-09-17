import { FC, useState } from 'react';
import {
  Button,
  Div,
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  Snackbar,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { getPersonalizedBarberTips } from '../barberGuides';
import { hairstyles } from '../recommendations';
import { useSelectedHairstyle } from '../selectedHairstyleStore';
import { barberAnswers } from '../store';
import { FavoriteButton } from '../components/FavoriteButton';

const technicalSections = [
  ['topLength', 'Верх'],
  ['sides', 'Бока'],
  ['transition', 'Переход'],
  ['fringe', 'Чёлка'],
  ['neckline', 'Затылок'],
  ['texture', 'Текстура'],
] as const;

export const BarberGuide: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { selectedHairstyleId } = useSelectedHairstyle();
  const [copied, setCopied] = useState(false);
  const hairstyle = hairstyles.find(({ id: hairstyleId }) =>
    hairstyleId === selectedHairstyleId
  );

  if (!hairstyle) {
    return (
      <Panel id={id}>
        <PanelHeader>Инструкция для барбера</PanelHeader>
        <Group>
          <Div className="barber-guide__empty">
            <h2>Стрижка не выбрана</h2>
            <Button stretched size="l" onClick={() => routeNavigator.push('/results')}>
              Вернуться к результатам
            </Button>
          </Div>
        </Group>
      </Panel>
    );
  }

  const { barberGuide } = hairstyle;
  const personalizedTips = getPersonalizedBarberTips(barberAnswers);
  const bullets = (items: string[]) => items.map((item) => `• ${item}`).join('\n');
  const copyText = [
    `AI-Барбер — ${hairstyle.name}`,
    ...technicalSections.flatMap(([key, title]) => [title + ':', barberGuide[key], '']),
    'Что сказать барберу:', bullets(barberGuide.barberInstructions), '',
    'С учётом моих ответов:', bullets(personalizedTips), '',
    'Укладка:', barberGuide.styling,
    `Продукты: ${barberGuide.products.join(', ')}.`, '',
    'Коррекция:', barberGuide.maintenance, '',
    'Чего лучше избегать:', bullets(barberGuide.avoid),
  ].join('\n');

  const copyInstructions = async () => {
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
  };

  return (
    <Panel id={id}>
      <PanelHeader>Инструкция для барбера</PanelHeader>
      <Group>
        <Div className="barber-guide">
          <Button mode="tertiary" onClick={() => routeNavigator.push('/results')}>
            ← Назад
          </Button>

          <img className="barber-guide__image" src={hairstyle.image} alt={hairstyle.name} />
          <header className="barber-guide__hero">
            <h1>{hairstyle.name}</h1>
            <p>{hairstyle.description}</p>
            <div className="detail-favorite"><FavoriteButton hairstyleId={hairstyle.id} showLabel /></div>
          </header>

          <h2>Инструкция для барбера</h2>
          <div className="barber-guide__technical">
            {technicalSections.map(([key, title]) => (
              <section className="barber-guide__card" key={key}>
                <h3>{title}</h3>
                <p>{barberGuide[key]}</p>
              </section>
            ))}
          </div>

          <GuideSection title="Что сказать барберу" items={barberGuide.barberInstructions} />
          <GuideSection
            title="С учётом ваших ответов"
            items={personalizedTips}
            emptyText="Дополнительных уточнений по вашим ответам нет."
          />

          <section className="barber-guide__section">
            <h2>Укладка</h2>
            <p>{barberGuide.styling}</p>
            <p><b>Средства:</b> {barberGuide.products.join(' · ')}</p>
          </section>
          <section className="barber-guide__section">
            <h2>Поддержание формы</h2>
            <p>{barberGuide.maintenance}</p>
          </section>
          <GuideSection title="Чего лучше избегать" items={barberGuide.avoid} />

          <p className="barber-guide__disclaimer">
            Инструкция носит рекомендательный характер. Финальное решение лучше
            адаптировать вместе с барбером с учётом структуры и роста волос.
          </p>
          <Button stretched size="l" onClick={() => void copyInstructions()}>
            Скопировать инструкцию
          </Button>
        </Div>
      </Group>
      {copied && (
        <Snackbar
          onClose={() => undefined}
          onClosed={() => setCopied(false)}
          duration={2500}
        >
          Инструкция скопирована
        </Snackbar>
      )}
    </Panel>
  );
};

type GuideSectionProps = {
  title: string;
  items: string[];
  emptyText?: string;
};

const GuideSection: FC<GuideSectionProps> = ({ title, items, emptyText }) => (
  <section className="barber-guide__section">
    <h2>{title}</h2>
    {items.length > 0 ? (
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    ) : (
      <p>{emptyText}</p>
    )}
  </section>
);
