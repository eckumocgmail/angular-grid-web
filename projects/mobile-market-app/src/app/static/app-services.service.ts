import { Injectable } from '@angular/core';
 
import { CardModel,ActionModel } from '../shared/card-model';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  public services: CardModel[] = [
    new CardModel(
      'Карточка пациента','По пациенту',    
      'Просмотр истории болезни, противопоказаний, хронических заболеваний',    
      [new ActionModel('перейти','')]),
    new CardModel('График дежурств','По дням, кабинетам','Просмотр истории болезни, противопоказаний, хронических заболеваний',[new ActionModel('перейти','')]),
    new CardModel('Запись на приём','По специалистам, по дням','Просмотр истории болезни, противопоказаний, хронических заболеваний',[new ActionModel('перейти','')]),
    new CardModel('Руководство пользователя','По разделам','Просмотр истории болезни, противопоказаний, хронических заболеваний',[new ActionModel('перейти','')]),
    new CardModel('Статистика','По специалистам, по дням','Просмотр истории болезни, противопоказаний, хронических заболеваний',[new ActionModel('перейти','')]),
    new CardModel('Отзывы и благодарности','По специалистам, по дням','Просмотр истории болезни, противопоказаний, хронических заболеваний',[new ActionModel('перейти','')]),
  ];

  constructor() { }
}
