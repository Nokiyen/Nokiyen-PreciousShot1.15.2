/*
    In default, if you cancel ScreenShotEvent, Forge automatically sends a chat message to the player.
    This asm skip the message.
 */
function initializeCoreMod() {

    //You can't use let or const in your asm javascript. I don't know why.
    var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
    var Opcodes = Java.type('org.objectweb.asm.Opcodes');
    var InsnList = Java.type("org.objectweb.asm.tree.InsnList");
    var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");
    var VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");

    var mappedMethodName = ASMAPI.mapMethod("handleComponentClicked"); // = handleComponentClicked


    /*
    [normal code]
    public boolean handleComponentClicked(ITextComponent p_handleComponentClicked_1_) {
        ~~~~~
    }

    [expected modified code]
    public boolean handleComponentClicked(ITextComponent p_handleComponentClicked_1_) {
        ASMChatClickEvent.handleComponentClick(p_handleComponentClicked_1_); //added line.
        ~~~~~
    }

    [modified byte code]
    public handleComponentClicked(Lnet/minecraft/util/text/ITextComponent;)Z
        INVOKESTATIC noki/preciousshot/asm/ASMChatClickEvent.handleComponentClick (Lnet/minecraft/util/text/ITextComponent;)V //added line.
        TRYCATCHBLOCK L0 L1 L2 java/net/URISyntaxException
        ~~~~~
    */
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.client.gui.screen.Screen',
                'methodName': mappedMethodName,
                'methodDesc': '(Lnet/minecraft/util/text/ITextComponent;)Z'
            },
            'transformer': function(method) {
                print("Enter transformer2.");

                var toInject = new InsnList();
                toInject.add(new VarInsnNode(Opcodes.ALOAD, 1));
                toInject.add(new MethodInsnNode(
                    Opcodes.INVOKESTATIC,
                    "noki/preciousshot/asm/ASMChatClickEvent",
                    "handleComponentClick",
                    "(Lnet/minecraft/util/text/ITextComponent;)V",
                    false
                ));

                // Inject new instructions just after the target.
                method.instructions.insert(toInject);

                return method;
            }
        }
    }
}