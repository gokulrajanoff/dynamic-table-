<aura:application extends="force:slds">
	<c:DynamicTableComponent.cmp Object='contact' queryFields='id,name,email' fullQuery='select id,name,email from contact'></c:DynamicTableComponent.cmp>
</aura:application>
