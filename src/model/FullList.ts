import ListItem from "./ListItem";

interface List {
    list: ListItem[]
    load(): void,
    /* 
    void is used where there is no data. For example, 
    if a function does not return any value then it can specify void as return type.
    
    function sayHi(): void { 
    console.log('Hi!')
    }
    
    */
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {

    //create a 'Singlton' with 'private' in front of constructor
    //and 'static instance: FullList = new FullList()
    //that means:
    //there'll only be one instance of this class created,
    //because there's only one list

    static instance: FullList = new FullList()
    private constructor(
        private _list: ListItem[] = [],
    ) { }

    get list(): ListItem[] {
        return this._list
    }


    load(): void {
        //load everything from localStorage and checked if it's there
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        //created new items from parsed List
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(
                itemObj._id,
                itemObj._item,
                itemObj._checked
            )
            FullList.instance.addItem(newListItem)
        })
    }


    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        //set to empty list
        //then overwrite it 
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }

}