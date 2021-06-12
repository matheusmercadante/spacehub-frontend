import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #fd753d;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #fd753d;
      margin: 0 8px;
    }
  }
`;

export const MyPackages = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-left: 16px;
    
    text-decoration: none;
    color: #fd753d;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Packages = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #fd753d;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #fd753d !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
