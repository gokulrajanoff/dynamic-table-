({
    getRecordsForTable : function(component, event, helper) {
        var action=component.get("c.Get_Record_For_Table_Input_From_Query");
        var Object=component.get("v.Object");
        var queryFields=component.get("v.queryFields");
        var fullQuery=component.get("v.fullQuery");
        console.log("Object"+Object+"queryFields"+queryFields+"fullQuery"+fullQuery);
        //  action.setParams({"objectName":"contact","queryFields":"name,title,phone,email","fullQuery":"select name,title,phone,email from contact"});
        action.setParams({"objectName":Object,"queryFields":queryFields,"fullQuery":fullQuery});
        
        action.setCallback(this,function(response)
                           {
                               component.set("v.Table_header_Records",response.getReturnValue());
                               var records = component.get("v.Table_header_Records");
                               console.log(component.get("v.Table_header_Records"));
                               if(records==null)
                               {
                                   component.set("v.Error", true);
                                   component.set("v.showHeaders",false);
                               }
                               if (records!=null && records.ListOfEachRecord.length == 0) {
                                   component.set("v.Message", true);
                                   component.set("v.showHeaders",false);
                                   
                               } else {
                                   component.set("v.Message", false);
                                   component.set("v.showHeaders",true);
                               }
                           });
        $A.enqueueAction(action);
    },
    keyup:function(component, event, helper) {
        var searchKeyFld = component.find("searchId");
        var srcValue = searchKeyFld.get("v.value");
        console.log("srcvalue"+srcValue);
        console.log("keyupfunction"+event.keyCode); 
        console.log(component.get("v.Table_header_Records"));
        var tableRecords=component.get("v.Table_header_Records");       
        if ((srcValue == '' || srcValue == null) && (event.keyCode === 13)) {
            alert("Enter some value to Search");
        }
        else{
            
            if(tableRecords!=null)
            {
                if(tableRecords.SwapVariable==null)
                {
                    tableRecords.SwapVariable=tableRecords.ListOfEachRecord;
                }
                else
                {
                    tableRecords.ListOfEachRecord=tableRecords.SwapVariable;
                }
                var headerRecords = tableRecords.headerList;
                var Index=0;
                var Sorted=1;
                for(var i=0;i<headerRecords.length;i++){
                    if(headerRecords[i].sorted!=2)
                    {
                        Index=headerRecords[i].index;
                        Sorted=headerRecords[i].sorted;
                    }
                }
                var originalRecords=tableRecords.ListOfEachRecord;
                var searchRelatedRecords=[];
                for(var i=0;i<tableRecords.ListOfEachRecord.length;i++){
                    var matchFound=false;
                    for(var j=0;j<tableRecords.ListOfEachRecord[i].recordValue.length;j++)
                    {
                        var value = tableRecords.ListOfEachRecord[i].recordValue[j];
                        if(value.toString().toLowerCase().indexOf(srcValue)!= -1)
                        {
                            matchFound=true;
                        }
                    }
                    if(matchFound)
                    {
                        searchRelatedRecords.push(tableRecords.ListOfEachRecord[i]);
                        if(Sorted==1){
                            searchRelatedRecords.sort(function(a,b) {return (a['recordValue'][Index].toString().toLowerCase()  > b['recordValue'][Index].toString().toLowerCase() ) ? 1 : ((b['recordValue'][Index].toString().toLowerCase()  > a['recordValue'][Index].toString().toLowerCase() ) ? -1 : 0);} );
                            
                        }
                        else
                        {
                            searchRelatedRecords.sort(function(a,b) {
                                return (a['recordValue'][Index].toString().toLowerCase()  < b['recordValue'][Index].toString().toLowerCase() ) ? 1 : ((b['recordValue'][Index].toString().toLowerCase()  < a['recordValue'][Index].toString().toLowerCase() ) ? -1 : 0);} );
                            
                            
                        }
                    }
                }
                tableRecords.SwapVariable=originalRecords;
                tableRecords.ListOfEachRecord=[];
                tableRecords.ListOfEachRecord=searchRelatedRecords;
                component.set("v.Table_header_Records",tableRecords); 
            }
        }
        
    },
    sortColumn : function(component, event, helper) {
        var ctarget = event.currentTarget;
        var Fieldindex = ctarget.dataset.value;
        console.log("selected Field"+Fieldindex);
        var Wrapedrecords = component.get("v.Table_header_Records");
        var objectRecord = Wrapedrecords.ListOfEachRecord;
        var headerRecord = Wrapedrecords.headerList;
        console.log(headerRecord);
        for(var i=0;i<headerRecord.length;i++){
            console.log("loop:"+headerRecord[i].name+" - "+Fieldindex);
            if(headerRecord[i].index==Fieldindex)
            {	console.log("match entered");
             var sorted = headerRecord[i].sorted;
             if(sorted==1)
             {
                 //desc
                 console.log("descending");
                 objectRecord.sort(function(a,b) {
                     return (a['recordValue'][headerRecord[i].index].toString().toLowerCase()  < b['recordValue'][headerRecord[i].index].toString().toLowerCase() ) ? 1 : ((b['recordValue'][headerRecord[i].index].toString().toLowerCase()  < a['recordValue'][headerRecord[i].index].toString().toLowerCase() ) ? -1 : 0);} );
                 sorted=0;
             }
             else if(sorted==0 || sorted==2)
             {
                 console.log("ascending");
                 objectRecord.sort(function(a,b) {return (a['recordValue'][headerRecord[i].index].toString().toLowerCase()  > b['recordValue'][headerRecord[i].index].toString().toLowerCase() ) ? 1 : ((b['recordValue'][headerRecord[i].index].toString().toLowerCase()  > a['recordValue'][headerRecord[i].index].toString().toLowerCase() ) ? -1 : 0);} ); 
                 sorted=1;
             }
             headerRecord[i].sorted=sorted; 
             
            }
            else{
                headerRecord[i].sorted=2;
            }
        }
        Wrapedrecords.records=objectRecord;
        Wrapedrecords.headerList=headerRecord;
        console.log(Wrapedrecords);
        component.set("v.Table_header_Records",Wrapedrecords);
        
        
    },
    DOSomeThingOnCLickOfARow : function(component, event, helper) {
        var ctarget = event.currentTarget;
        //we can get the record id of the row in table.
        var id_str = ctarget.dataset.value;
        
    }
    
})
