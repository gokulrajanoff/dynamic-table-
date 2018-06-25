<aura:application extends="force:slds">
	<c:Lightning_Data_Table_Component Object='contact' queryFields='id,name,email' fullQuery='select id,name,email from contact'></c:Lightning_Data_Table_Component>
</aura:application>
