import { forEach, result } from "lodash";
import * as moment from 'moment';


export interface Stories 
{
  value: Story[];
}
export interface Story 
{
  Title: string;
  PublishDate :Date;
  Image :object;
  Description: string;
  URL :object;
  LinkType :{
    Element :string
  };
  Partner :{
    Element :string
  };
  Industry :{
    Element :string
  };
  SolutionArea :{
    Element :string
  };
  PartnerType :{
    Element :string
  };
  StoryType :string;
  Tags :{
    Element: string
  };
  Featured :Boolean;
}


export class GSPUSStoryHelper {
    

    public static _listAll(items: object, spacer: string = ', '): string{
        console.log(items);
        let res :string = '';
        let i :number = 0;
        if(items != null){

            for (const j in items) {  
                if(i > 0){
                    res += spacer;
                }
                res += items[j];
                i++;
            }
        }

        return res;
    }

    public static _formatDate(date: Date): string{
        return moment(date).format('MMMM YYYY');
    }

    public static _resultCount(stories: Story[]): string{
        let res :string = '';
        let count = stories.length;

        if(count >= 5000){            
            res = '5,000+ Results';
        }else if(count == 0){
            res = 'No Results';
        }else{
            res = count.toLocaleString() + ' Results';
        }

        return res;
    }

}