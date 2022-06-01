import * as moment from 'moment';


export interface Stories 
{
  value: Story[];
}
export interface Story 
{
  Id: number;
  Title: string;
  PublishDate :Date;
  Image :object;
  Description: string;
  URL :string;
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
  Featured :string;
  Download :string;
}
export interface SPList
{
  Title: string;
  ID: string;
}


export class GSPUSStoryHelper {
    

    public static _listAll(items: object, spacer: string = '/'): string{
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
            res = count.toLocaleString() + ' Result' + (count > 1 ? 's' : '');
        }

        return res;
    }

}