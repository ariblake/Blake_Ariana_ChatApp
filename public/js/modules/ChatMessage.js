// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {
    props: ['msg'],

    template: `
        <p class="new-message pop" :class="{ 'my-message' : matchedID}">
            <span>{{ msg.message.name }}: </span>
            {{ msg.message.content }}
        </p>
    `,

    data: function() {
        return { 
            message: "hello from the template",
            matchedID: this.$parent.socketID == this.msg.id // parent is referring to main_vm.js
        };

        
    }
}