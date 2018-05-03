# dynamic-table-
Dynamic Reusable Table Component 
This component is for displaying the record in a table format, that allow sorting on header fields (without using any extra libraries) and the table is having fixed header and scrolling enabled. This component runs on standard as well as custom object.

To DO :

Create Apex class :(Name It as you Like) -> Copy Paste entire Apex code
Create Lightning Component -> Copy Paste entire component code , don’t forget to change the controller name to your apex , otherwise I am not responsible for the error.
Controller will be automatically calculated, so no problem ,Copy Paste controller.js code , change the action,setparam() -> according to  your object and field to display.
Preview as simple as that.
Overview of this Component:
Apex Class : Table Class
Method : Get_Record_For_Table_Input_From_Query(String objectName,String queryFields,String fullQuery)
Return : Object that can be displayed on Table
objectName = Name of the Object.
queryFields = Fields we want to display.
fullQuery = Full Soql Query.

Note:
Place we need to modify code to make it run on different object

var action=component.get("c.Get_Record_For_Table_Input_From_Query");
        action.setParams({"objectName":"contact","queryFields":"name,title,phone,email","fullQuery":"select name,title,phone,email from contact"});
Or we can call this method DynamicTableClass.Get_Record_For_Table_Input_From_Query(objectName, queryFields, fullQuery) from other apex class.

Similarly we can create Different component that will display records from different object by just modifying the parameter passed to Get_Record_For_Table_Input_From_Query() function.

Other Features:

1.On Click of a row, a Controller function will be called , we can get the record id of that row by
var ctarget = event.currentTarget;
var RecordID = ctarget.dataset.value;
we can use the Record Id to fire events or else do something as you wish :D.

2. Sorting Done Client side without extra libraries , so no headache in creating static resource fields. And its fast , no server calls.

3.Scrollable View , so we can see may records at a time , we can adjust the height of table according to your wish.
