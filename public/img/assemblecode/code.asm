.MODEL small
.STACK 100h
.DATA
lb DB 0Dh, 0Ah, "$"
logo         DB 0Dh,0Ah,"HIIII WELCOME TO LEISURE CLUB SYSTEM", 0Dh, 0Ah, "$"
mainMenu     DB "1. Staff", 0Dh, 0Ah, "2. Member", 0Dh, 0Ah, "3. Exit", 0Dh, 0Ah, "Please Enter Your Selection : ", "$"
msgId        DB 0Dh, 0Ah,"Enter ID: $"
msgPassword  DB 0Dh, 0Ah,"Enter Password: $"
successMsg   DB 0Dh, 0Ah,"Login Successful!", 0Dh, 0Ah, "$"
failMsg      DB 0Dh, 0Ah,"Login Failed, please try again.", 0Dh, 0Ah, "$"
exitMsg      DB 0Dh, 0Ah,"Exiting program. Goodbye!", 0Dh, 0Ah, "$"
inputBuffer  DB 10, 0, 10 dup('$')
inputIdBuffer DB 10, 0, 10 dup('$')
inputPasswordBuffer DB 10, 0, 10 dup('$')
memberLoginMenu DB "1.Register", 0Dh, 0Ah
            DB "2.Login", 0Dh, 0Ah
            DB "3.Return to Main Menu", 0Ah, 0Dh
            DB "Please select your choice:$"
memberSection DB "Welcome to member section", 0Dh, 0Ah, "$"
defaultMemberID     DB '1001', 0
msgName DB 0Ah,0Dh,'Please enter your name:$'
inputName DB 20, 0, 20 dup(0)
msgIc DB 'Please enter your IC without(-):$'
msghi DB "HI:$"
msgPhone DB 0Ah,0Dh,"Please enter your phone number:$"
msgPassword1 DB "Please enter your new password:$"
msgPassword2 DB "Please reenter your password:$"
msgPasswordMatch DB 0ah,0dh,"Correct password!$"
msgPasswordMismatch DB "Your password is incorrect please try again!",0dh,0ah,"$"
msgSuccessful DB "New Account created!$"
newId DB "Your new id is:$"  
inputPassword db 20, 0, 20 dup(0)    ; ????20???
confirmPassword db 20, 0, 20 dup(0)  ; ????20???
inputPhone DB 12,0,12 dup('$')
outputIc DB "Your IC number is:$"
inputIc DB 13, 0, 13 dup('$')  ; Adjusted to match actual input length
newline db 0Ah, 0Dh, "$"
memberMenuLogo DB "--------------------------------------", 0dh, 0ah 
              DB "|Welcome to member menu              |",0dh,0ah,
              DB "--------------------------------------", 0dh, 0ah
              DB "|Select 1 for Booking facilities     |", 0dh,0ah,
              DB "|Select 2 for check facilities Price |",0dh, 0ah,  
              DB "|Select 3 for overall Booking        |",0dh, 0ah,
              DB "|Select 4 for Logout Account         |",0dh, 0ah,
              DB "|Select 5 Return Main Menu           |",0dh,0ah 
              DB "--------------------------------------", 0dh,0ah 
              DB "Please enter you selection:$"       
               
welcomeFacilityLogo DB 0Ah,0Dh,"Welcome to booking facilities",0Ah,0Dh
 buffer   DB 5 DUP('$')  ; Temporary buffer for conversion         
 MAX_MEMBERS EQU 20
memberIDArray        DB MAX_MEMBERS * 5 DUP('$')
memberPasswordArray  DB MAX_MEMBERS * 5 DUP('$')
memberNameArray      DB MAX_MEMBERS * 20 DUP('$')
memberICArray        DB MAX_MEMBERS * 13 DUP('$')
memberPhoneArray     DB MAX_MEMBERS * 12 DUP('$')
memberCounter        DB 0
                                                      
msgMemberExists DB "Member ID already exists. Please try again.", 0Dh, 0Ah, "$"
msgMemberNotFound DB "Member not found. Please try again.", 0Dh, 0Ah, "$"
msgMemberAdded DB "Member added successfully!", 0Dh, 0Ah, "$"
msgMemberLimit DB "Maximum number of members reached.", 0Dh, 0Ah, "$"  
msgInvalidIC DB "Invalid IC number. Please enter a 12-digit number.", 0Dh, 0Ah, "$"
msgInvalidPhone DB "Invalid phone number. Please enter a 10 or 11-digit number.", 0Dh, 0Ah, "$"
msgWelcome DB "Welcome, ", "$"
ten DW 10
msgLoginHeader DB "=== Member Login ===", 0Dh, 0Ah, "$"
msgInvalidID DB "Invalid ID. Please enter a 4-digit number.", 0Dh, 0Ah, "$"
msgTryAgain DB "Login failed. Do you want to try again?? (Y/N): $"    
memberCurrentNumber DB 3,0,3 dup(0)   
tempPasswordBuffer DB 20,0, 10 dup(0)  ;  
memberLoginId DB "1001$"
;All staff required data      
 ; Facility information arrays 
 MAX_FACILITIES EQU 10
MAX_SLOTS EQU 6  ; Assuming 8 slots per facility
    facilityNameArray   DB MAX_FACILITIES * 20 DUP('$')    
    facilityIDArray     DB MAX_FACILITIES * 5 DUP('$')
    facilitySlotArray   DB MAX_FACILITIES * MAX_SLOTS * 5 DUP('$')
    facilityBookArray   DB MAX_FACILITIES * MAX_SLOTS * 4 DUP('$')
    facilityCounter     DB 0

    ; Messages
    msgEnterFacilityName DB "Enter Facility Name: $", 0Dh, 0Ah, "$"
    msgEnterFacilityID   DB "Enter Facility ID: $", 0Dh, 0Ah, "$"
    msgEnterSlotPrice    DB "Enter Price for Slot ", 0Dh, 0Ah, "$"
    msgSlotBooked        DB "Slot already booked by other member", 0Dh, 0Ah, "$"
    msgInputTooLong      DB "Please enter the correct input length", 0Dh, 0Ah, "$"
    msgFacilityLimitReached DB "Maximum number of facilities reached", 0Dh, 0Ah, "$"
    invalidInputMsg DB 0Dh,0Ah,"Invalid input. Please enter Y or N.", 0Dh, 0Ah, "$"    
    bookingMenu DB 0Dh,0Ah,"=== Facility Booking Menu ===", 0Dh, 0Ah
                DB "1. View Facilities", 0Dh, 0Ah
                DB "2. Book a Facility", 0Dh, 0Ah
                DB "3. Return to Member Menu", 0Dh, 0Ah
                DB "Enter your choice: $"
viewFacilitiesMsg DB 0Dh,0Ah,"=== Available Facilities ===", 0Dh, 0Ah, "$"
bookFacilityMsg DB 0Dh,0Ah,"Enter Facility ID to book: $"
bookSlotMsg DB 0Dh,0Ah,"Enter Slot number to book (1-6): $"
bookSuccessMsg DB 0Dh,0Ah,"Booking successful!", 0Dh, 0Ah, "$"
bookFailMsg DB 0Dh,0Ah,"Booking failed. Slot already taken or invalid input.", 0Dh, 0Ah, "$"  
msgInvalidInputFacilityId db 'Please enter exactly five digits for the ID.$'
msgInvalidInputFacilityPrice db 'Please enter exactly two digits for the price.$'
userBookingsMsg DB 0Dh,0Ah,"=== Your Booking Records ===", 0Dh, 0Ah, "$"
noBookingsMsg DB "You have no current bookings.", 0Dh, 0Ah, "$"  
msgNoFacility DB "No Facility Found Please Contact Staff $"
bookingEntryMsg DB "Facility ID: $"
slotMsg DB ", Slot: $"
priceMsg DB ", Price: RM$"
continueBookingMsg DB 0Dh,0Ah,"Do you want to book another slot?? (Y/N): $"
   msgDisplayHeader DB 0Dh, 0Ah,              "+-----------+------------------------+------------------------------------+", 0Dh, 0Ah
                             DB               "| Facility  | Facility               | Slot Prices (RM)                   |", 0Dh, 0Ah
                             DB               "| ID        | Name                   | 1     2     3     4     5     6    |", 0Dh, 0Ah
                             DB               "+-----------+------------------------+------------------------------------+", 0Dh, 0Ah, "$"  
   msgDisplayAvailableHeader DB 0Dh, 0Ah,     "+-----------+------------------------+------------------------------------+", 0Dh, 0Ah
                             DB               "| Facility  | Facility               | Slot (A= Available, B= Booked)     |", 0Dh, 0Ah
                             DB               "| ID        | Name                   | 1     2     3     4     5     6    |", 0Dh, 0Ah
                             DB               "+-----------+------------------------+------------------------------------+", 0Dh, 0Ah, "$"
msgLine    DB                                 "+-----------+------------------------+------------------------------------+", 0Dh, 0Ah, "$"        ;
    tmpAmount db "000.00$"         
    totalAmount db "000.00$"  
tempTax     db "0000000$" 
totalAmountAfterTax db "0000.000$"  
totalRevenue DW "0000.000$"
paymentOptions DB 0Dh,0Ah,"Payment Options:", 0Dh,0Ah
               DB "1. Online Banking", 0Dh,0Ah
               DB "2. Credit/Debit Card", 0Dh,0Ah
               DB "3. E-Wallet", 0Dh,0Ah
               DB "Please select your payment method: $"
paymentConfirmation DB 0Dh,0Ah,"Thank you for your payment of RM $"
paymentMethodMsg DB 0Dh,0Ah,"Payment method selected: $"
onlineBankingMsg DB "Online Banking$"
cardPaymentMsg DB "Credit/Debit Card$"
eWalletMsg DB "E-Wallet$"
                                                                         
availableMsg DB ' A   ', '$'
notAvailableMsg DB ' B   ', '$'
    ; Input buffers
    inputFacilityNameBuffer  DB 21, 0, 21 DUP('$')
    inputFacilityIDBuffer    DB 6, 0, 6 DUP('$')
    inputSlotPriceBuffer     DB 6, 0, 6 DUP('$') 
    tmpSlotBuffer            DB 3, 0, 3 DUP('$') 
    tmpFacilityNumber        DB 3, 0, 3 DUP('$')
    
    
    
;new staff info, 19 slot avalible
;7 input for id and 4 password only
;first array place have value for the first login
staffIDArray        DB "1234567$",  19 * 8 dup ("$")
staffPasswordArray  DB "1234$", 19 * 20 dup ("$")
staffNameArray      DB "Matthew$",  19 * 20 dup ("$")

staffCounter     DB 1 ;1 beacuse of the fixed account for the first staff sign in
staffCounterFull DB "Staff Already Full" ,"$"

; use to accurately find the correct user and correct password, uesrID[1] must use userPassword[1], otherwise use staff also can log in
staffCounterLoopIndex DB 1

;---Staff Menu---
staffMenuPage DB "-----------------------------------", 0dh, 0ah 
              DB "|Welcome to staff mode!           |",0dh,0ah,
              DB "-----------------------------------", 0dh, 0ah
              DB "|Select 1 for Manage Staff        |", 0dh,0ah,
              DB "|Select 2 for Add Facility        |",0dh, 0ah,
              DB "|Select 3 Return Main Menu        |",0dh,0ah
              DB "----------------------------------", 0dh,0ah
              DB "Please enter you selection:$"

staffManagementPage DB "Select 1 For Adding New Staff ", 0ah,0dh,
                    DB "Select 2 For Edit Staff Password", 0ah,0dh,
                    DB "Select 3 For Display All Staff", 0ah,0dh,
                    DB "Select 4 For Return Main Menu", 0ah,0dh,
                    DB "Please enter you selection:$"


;warning messege for staff when select is not in range
warningMessegeStaff           DB "Invalid input, Please Enter 1-3", "$"
warningMessegeStaffManagement DB "Invalid Input, Please Enter 1-5", "$"
;---Staff Menu---                    

;---Add New Staff--- 
newStaffIDMsg       DB "New Staff ID (0-9 7digit only) : $"
newIdBuffer         DB 11 dup("$"); 10 first 2 for length and actual input size, 10 for /r, last one for $

newStaffNameMsg     DB "New Staff Name : $"
newNameBuffer       DB 20 dup("$")

newStaffPasswordMsg DB "New Staff Password: $"
currentPasswordBuffer DB 20 dup ("$")
newPasswordBuffer   DB 20 dup("$")

;if want to continuous input, must use this to add on the index to ensure the accurate place for new user info
lastUserIDLength   DB 0
lastUserNameLength DB 0
lastUserPasswordLength DB 0

;end of the adding staff messege
addStaffEndingMsg DB "New Staff Added Successfully!! $"
addingNewStaffMsg DB "Do you want to add another staff??(1 for yes, others for no) $"


;Add Staff Error Messege
newIDErrorMsg       DB "Invalid ID Input, please try again", "$"
newPasswordErrorMsg DB "Invalid Password Input, please try again", "$"
;---Add New Staff--- 

;---Edit Staff---
currentPasswordMsg DB "Please Enter your current password : $"
newPasswordMsg     DB "Enter New Password : $"
confirmPasswordMsg DB "Re-enter your new password : $"
successfulMsg      DB "Password change sucessfully! $"

passwordInvalid   DB "Password Not Founded Or Incorrect $"


passwordCounter DW 0
;---Edit Staff---
              
;staff menu selection, accept answer 1-4 only
staffSelection     DB 0
developmentMessege DB "Under development", "$"



;---display staff info---
staffInfo     DB "Staff Information", "$"
dashline      DB "------------------------------------" ,"$"
displayIDName DB "ID              NAME", "$"
totalStaffMsg DB "Total Staff : " ,"$"
;displaying gap between id and name
nineSpace     DB "         ", "$"
;press any key to going back to the staff module
pressAnyKey   DB "Press Any Key To Return: $"
;---display staff info---

.CODE
main PROC
    ; Initialize DS
    mov ax, @data
    mov ds, ax

mainLoop:    
    call resetVariablesExact
    

    lea dx, logo
    mov ah, 09h
    int 21h

    ; Display Main Menu
    lea dx, mainMenu
    mov ah, 09h
    int 21h

    ; Input Menu Choice
    mov ah, 01h
    int 21h
    cmp al, '1'
    je handleStaff
    cmp al, '2'
    je handleMember
    cmp al, '3'
    jmp far ptr exitProgram

    ; Invalid Choice Message
    lea dx, failMsg
    mov ah, 09h
    int 21h
    jmp mainLoop   
    
    
    
    
    
    

       
   
handleStaff:
    ; Login Staff
    call loginStaff
    jmp staffMenu

loginStaff:
    ;put staffCounter into cx, to check how many staff in the array
    loginStaffID:
    mov ax,0
    mov staffCounterLoopIndex , 0; always reset it because it will increase based on staffCounter, it also ensure accuracy 
    ; reset this memory all of the time, for the accuracy, dont ask me how when it work, it work ><
    mov al, staffCounter
    mov cx, ax
    ;for checking array purpose
    mov si,2; si for the user input
    mov di,0; for the array
    ; Input staff ID
    lea dx, msgId
    mov ah, 09h
    int 21h
    mov ah, 0Ah
    lea dx, inputIdBuffer
    int 21h
    
    ;checking the input and the array are matched
    IDValidationL1:
    mov al, inputIDBuffer[si]
    mov bl, staffIDArray[di]
    
    inc si
    inc di
    cmp bl, "$"
    je  loginStaffPassword
    
    cmp al, bl
    jne IDvalidationL2
    jmp IDvalidationL1 

    ;use to loop if the current id not the same id from array, use to find next array
    IDValidationL2: 
    mov si, 2;reset the si to 2 do search again from the array
    inc di
    mov bl, staffIDArray[di] 
    cmp bl, "$"
    je IDValidationL3
    jmp idValidationL2
    ; use to increase di and jmp to input fail if the cx < 1
    IDValidationL3:
    inc di
    loop IDVALIDATIONL4
    jmp inputidfail


    IDvalidationL4:
    inc staffCounterLoopIndex
    jmp IDvalidationL1

    
    ; Input Password
    ;put staffCounter into cx, to check how many staff in the array
    loginStaffPassword:
    mov ax,0
    mov al, staffCounterLoopIndex
    mov cx, ax
    ;for checking array purpose
    mov si,2; si for the user input
    mov di,0; for the array

    lea dx, msgPassword
    mov ah, 09h
    int 21h
    mov ah, 0Ah
    lea dx, inputPasswordBuffer
    int 21h
    
    ;same procedure like IDvalidation, literally copy and paste only
    passwordValidationL1:
    cmp staffCounterLoopIndex, 0
    je passwordvalidationl3
    mov bl, staffPasswordArray[di]
    inc di
    cmp bl, "$"
    je passwordvalidationl2
    jmp passwordvalidationl1

    ;use to loop if the current id not the same id from array, use to find next array
    passwordValidationL2:
    loop passwordvalidationl1 
    jmp passwordvalidationl3

    passwordValidationL3:
    mov al, inputPasswordBuffer[si]
    mov bl, staffPasswordArray[di]
    inc si
    inc di
    cmp bl, "$"
    je staffMenu
    cmp al,bl
    jne inputpasswordfail
    jmp passwordvalidationl3

    inputIdFail:
    call lineBreak
    mov ah,09h
    lea dx,newIDErrorMsg
    int 21h
    jmp loginStaffID
    
    inputPasswordFail:
    call lineBreak
    mov ah,09h
    lea dx, newPasswordErrorMsg
    int 21h
    jmp loginStaffPassword

staffMenu:
    call clearScreen
    mov ah, 09h
    lea dx, staffMenuPage
    int 21h
    ;input for the function 
    mov ah, 01h
    int 21h
    cmp al, '1'
    je staffManagement
    cmp al, '2'
    je addFacility
    cmp al , "3"
    ;clear the screen before jumping back to main if user choose 3
    call clearScreen
    je mainloop

    ;display error messege when input != 1-4
    call lineBreak
    mov ah,09h
    lea dx, warningMessegeStaff
    int 21H
    call pressKeyContinueFunction
    ;line break before loop it again
    call lineBreak
    ;jump back to staff menu
    jmp staffMenu

loginFailedStaff:
    lea dx, failMsg
    mov ah, 09h
    int 21h
    jmp loginStaff  ; Loop back to try again

;staffManagementModule
staffManagement:
    call staffManagementFunction
    
memberMenu: 
    call clearScreen
    lea dx, memberMenuLogo
    mov ah, 09h
    int 21h

    mov ah, 01h
    int 21h

    cmp al, '1'
    je displayAvailableFacility 
    cmp al, '2'   
    je displayFacility
    cmp al, '3'
    je displayUserBookings
    cmp al, '4' 
    je logOut
    cmp al, '5'
    je mainLoop

    ; Invalid Choice Message
    lea dx, failMsg
    mov ah, 09h
    int 21h
    jmp memberMenu   
     

    
handleMember:
    ; Handle Member Section 
    call lineBreak
    lea dx, memberSection
    mov ah, 09h
    int 21h
    lea dx, memberLoginMenu
    mov ah, 09h
    int 21h

    ; Input Menu Choice
    mov ah, 01h
    int 21h

    cmp al, '1'
    je register
    cmp al, '2'
    je memberLogin
    cmp al, '3'
    jmp mainLoop
    
    ; Invalid Choice Message
    lea dx, failMsg
    mov ah, 09h
    int 21h
    jmp handleMember

register:
    ; Check if maximum members reached 
      call lineBreak
    mov al, memberCounter
    cmp al, MAX_MEMBERS
    jae memberLimitReached

    ; Get and store name
    call getName 
    call lineBreak        

    ; Get and store IC
    call getIC  
    call lineBreak

    ; Get and store phone number
    call getPhoneNumber  
    call lineBreak

    ; Get and validate password
    call getPassword   
    call lineBreak

    ; Generate and store new member ID
    call generateMemberID   
    call storeMemberName    
    call storeMemberIc   
    call storeMemberPhone

    ; Increment member counter
    inc memberCounter

    ; Display registration success and member details
    call displayMemberDetails
    inc memberCounter
    jmp handleMember

getName:
    ; ??????
    mov ah, 09h
    lea dx, msgName
    int 21h

    ; ?????
    mov ah, 0Ah
    lea dx, inputName
    int 21h                        
    
    
    mov cx, 0
    lea di, [inputName + 1]  ; di ???????????
    mov cl, [di]             ; cl ?????????)
    lea di, [inputName + 2]  ; di ????????????
    add di, cx               ; ??????????? di ???

    mov byte [di], '$'       ; ???????? '$'
    ret
                            
storeMemberName:                                                       
    mov cx, 0
    lea si, memberNameArray
    mov cl, memberCounter  
    call findArrayByIndex 
    mov di,si
    lea si, inputName +2  
    mov cl, [inputName+1]
    call copy_String  
    ret


getIC:
    ; Print IC prompt
    mov ah, 09h
    lea dx, msgIc
    int 21h

    ; Read user IC number
    mov ah, 0Ah
    lea dx, inputIc
    int 21h

    ; Validate IC (ensure it's 12 digits)
    cmp byte ptr [inputIc + 1], 12
    jne invalidIC 
    ret

storeMemberIc:                                                       
    mov cx, 0
    lea si, memberIcArray
    mov cl, memberCounter  
    call findArrayByIndex 
    mov di,si
    lea si, inputIc +2  
    mov cl, [inputIc+1]
    call copy_String  
    ret

invalidIC:
    lea dx, msgInvalidIC
    mov ah, 09h
    int 21h
    jmp getIC

getPhoneNumber:
    ; Print phone prompt
    mov ah, 09h
    lea dx, msgPhone
    int 21h

    ; Read user phone number
    mov ah, 0Ah
    lea dx, inputPhone
    int 21h

    ; Validate phone number (ensure it's 10-11 digits)
    cmp byte ptr [inputPhone + 1], 10
    jl invalidPhone
    cmp byte ptr [inputPhone + 1], 11
    jg invalidPhone     
    ret

storeMemberPhone:                                                       
    mov cx, 0
    lea si, memberPhoneArray
    mov cl, memberCounter  
    call findArrayByIndex 
    mov di,si
    lea si, inputPhone +2  
    mov cl, [inputPhone+1]
    call copy_String  
    ret

invalidPhone:
    lea dx, msgInvalidPhone
    mov ah, 09h
    int 21h
    jmp getPhoneNumber

getPassword:
    ; Prompt for password
    mov ah, 09h
    lea dx, msgPassword1
    int 21h

    ; Read password
    mov ah, 0Ah
    lea dx, inputPassword
    int 21h

    call lineBreak

passwordConfirmLoop:
    ; Prompt for confirm password
    mov ah, 09h
    lea dx, msgPassword2
    int 21h

    ; Read confirm password
    mov ah, 0Ah
    lea dx, confirmPassword
    int 21h

    ; Compare passwords 
    lea si, inputPassword +2
    lea di, confirmPassword  +2
    mov cx, 0
    mov cl, [inputPassword +1]
    call compareStringLoop 
    cmp ax, 0
    jne passwordsNotEqual

    storeMemberPassword:                                                       
    mov cx, 0
    lea si, memberPasswordArray
    mov cl, memberCounter  
    call findArrayByIndex 
    mov di,si
    lea si, inputPassword +2  
    mov cl, [inputPassword+1]
    call copy_String  
    ret

passwordsNotEqual:
    ; Passwords do not match, display error and retry
    lea dx, msgPasswordMismatch
    mov ah, 09h
    int 21h
    jmp passwordConfirmLoop

generateMemberID:              
    lea di, [defaultMemberID + 3]
    add [di], 1    ; Add current member index
    

    ; ????????? (inputBuffer + 2) + cl
    lea di, [defaultMemberID]  ; di ?????????
    add di, 4                 ; di ????????

    ; ?? '$' ??
    mov byte [di], '$'         ; ???????? '$'  
    storeMemberId:                                                       
    mov cx, 0
    lea si, memberIdArray
    mov cl, memberCounter  
    call findArrayByIndex 
    mov di,si
    lea si, defaultMemberID   
    mov cl, 5
    call copy_String  
    ret
    call lineBreak
    ret


checkArrayLength: 
    
    push si  
loopArrayByDollar:
    mov  al,[si]
    cmp al,'$'
    je  findDollar
    inc si
    inc cx
    jmp loopArrayByDollar   
    
findDollar:
    pop si  
 
    
    
copy_string: 
        cmp cx, 0                     ; ??????????
        je copy_done                  ; ?? CX ? 0,?????
        
        mov al, [si]                  ; ?????????? AL
        mov [di], al                  ; ? AL ?????????
        inc si                        ; ?????
        inc di                        ; ??????
        dec cx                        ; ?? CX ??????
        jmp copy_string                 ; ????

copy_done:
        mov byte ptr [di], '$'        ; ???????? '$'

        ; ?????
        mov ah, 09h
        lea dx, newline
        int 21h
        ret                           ; ?????



displayMemberDetails:
    ; Display successful registration message
; Display successful registration message  
call clearScreen
mov ah, 09h
lea dx, msgSuccessful  ; ??????
int 21h
call lineBreak

; Display "Welcome, [name]"
mov ah, 09h
lea dx, msgWelcome  ; ?? "Welcome, "
int 21h

mov ah, 09h
lea dx, inputName+2  ; ?????????
int 21h

call lineBreak  ; ??

; Display new ID
mov ah, 09h
lea dx, newId
int 21h          
mov ah, 09h
lea dx, defaultMemberID  ; ????? dx
int 21h
call lineBreak

ret


memberLimitReached:
    mov ah, 09h
    lea dx, msgMemberLimit
    int 21h

endRegister:
    ret


memberLogin:
    ; Display login header
    call lineBreak
    mov ah, 09h
    lea dx, msgLoginHeader
    int 21h
    call lineBreak

inputMemberID:
    ; Prompt for member ID
    mov ah, 09h
    lea dx, msgId
    int 21h

    ; Read member ID
    mov ah, 0Ah
    lea dx, inputIdBuffer
    int 21h

    ; Validate member ID (should be 4 digits)
    cmp byte ptr [inputIdBuffer + 1], 4
    jne invalidMemberID

    ; Validate login
    call validateMemberLogin  
    cmp al,1
    jnz loginSuccess  ; Carry flag clear means login successful

    ; Login failed
    mov ah, 09h
    lea dx, failMsg
    int 21h
    call lineBreak

    ; Ask if user wants to try again
    mov ah, 09h
    lea dx, msgTryAgain
    int 21h

    mov ah, 01h
    int 21h
    
    cmp al, 'Y'
    je memberLogin
    cmp al, 'y'
    je memberLogin

    ; If not trying again, return to main menu
    jmp handleMember

invalidMemberID:
    mov ah, 09h
    lea dx, msgInvalidID
    int 21h
    call lineBreak
    jmp inputMemberID

memberLoginInputPassword:
    ; Prompt for password
    mov ah, 09h
    lea dx, msgPassword
    int 21h

    ; Read password (hidden input)
    mov cx, 0  ; Counter for password length
    lea si, inputPasswordBuffer + 2  ; Start storing from actual data area

readPasswordChar:
    mov ah, 08h  ; Read character without echo
    int 21h

    cmp al, 13  ; Check for Enter key
    je endPasswordInput

    cmp al, 8  ; Check for Backspace
    je handleBackspace

    ; Store the character
    mov [si], al
    inc si
    inc cx

    ; Display asterisk
    mov ah, 02h
    mov dl, '*'
    int 21h

    cmp cx, 20  ; Maximum password length
    jl readPasswordChar

endPasswordInput:
    mov byte ptr [inputPasswordBuffer + 1], cl  ; Store length
    mov byte ptr [si], '$'  ; Null-terminate
    call lineBreak
    ret

handleBackspace:
    cmp cx, 0  ; Check if there are characters to delete
    je readPasswordChar

    dec si
    dec cx

    ; Erase character from screen
    mov ah, 02h
    mov dl, 8   ; Backspace
    int 21h
    mov dl, ' ' ; Space to overwrite
    int 21h
    mov dl, 8   ; Backspace again
    int 21h

    jmp readPasswordChar

validateMemberLogin:
    ; Compare input ID with stored IDs              
    mov ax, 0
    mov al, [memberCounter]  ; ?? memberCounter ??? AL
    mov cx, ax 
    lea si, memberIDArray
    lea di, inputIdBuffer
    add di, 2
    mov bx, 4  ; Compare 4 digits 
    mov dx, 0
     
    call outerLoopArray
    cmp ax, 0
    jne loginFailed  ;??id
    

idFound:
    push dx
    call memberLoginInputPassword    
    
    mov cx, 0        
    lea si, memberPasswordArray
    mov cl, memberCurrentNumber  
  
    call findArrayByIndex
    lea di, tempPasswordBuffer 
    call checkArrayLength 
    lea si, inputPasswordBuffer +2
    lea di, tempPasswordBuffer
    mov cl, [inputPasswordBuffer +1] 
    call compareStringLoop
    cmp ax, 0
    jne loginFailed 
    pop dx
    jmp loginSuccess:

logOut:
    call clearScreen 
    resetMemberLoginId:
    LEA DI, memberLoginId  
    MOV CX, 5             
    MOV AL, '$'  

    fillLoop:
    MOV [DI], AL        
    INC DI               
    LOOP fillLoop         

    jmp mainLoop
    
    
    





compareStringLoop:  ; Renamed from compareLoop to avoid duplicate label 
    
    mov al, [si]
    cmp al, [di]   
    
    jne not_Equal        ; If not equal, jump to notEqual
    inc si
    inc di
    loop compareStringLoop             
    mov ax ,0
    ret 
    
not_Equal:
    mov ax,1
    ret


outerLoopArray:
    push bx    ; Save bx
    push di    ; Save di
    
    
    
innerLoopArray:
    mov al , [si]
    cmp al , '$'
    je nextArray
    
    cmp al, [di]
    jne nextArray
    
    inc si
    inc di
    dec bx
    jnz innerLoopArray   
    mov memberCurrentNumber ,dl  
    pop di       ; Restore di
    pop bx       ; Restore bx
    mov ax , 0
    ret
    
nextArray:
    cmp [si],'$'
    je continueNextArray
    inc si
    jmp nextArray
    
continueNextArray:
    inc si 
    inc dx         
    pop di       ; Restore di
    pop bx       ; Restore bx
    loop outerLoopArray 
    mov ax, 1
    mov dx, 0
    ret
    
findArrayByIndex:
    mov bx, cx   
    cmp bx, 0
    je bxZero   
    
    
findNextPassword:
    mov al, [si]
    cmp al, '$'
    je nextPassword
    inc si
    jmp findNextPassword
    
nextPassword:
    dec bx 
    inc si
    cmp bx,0
    jne findNextPassword
    ret   
bxZero:
ret

loginFailed:
    stc  ; Set carry flag to indicate failure
    ret

loginSuccess:
    ; Display welcome message 
    push dx
    mov ah, 09h
    lea dx, successMsg
    int 21h      
    pop dx 
    mov cx, dx
    lea si, memberIdArray   
    call findArrayByIndex 
    lea di, memberLoginId
    call checkArrayLength
    jmp memberMenu

    ; Here you can add code to transition to the member menu 
addFacility:
    CALL clearScreen
    
    ; Check if maximum facilities reached
    MOV AL, facilityCounter
    CMP AL, MAX_FACILITIES
    JAE facility_limit_reached

    CALL getFacilityName
    CALL lineBreak
    CALL getFacilityId
    CALL lineBreak
    CALL getFacilityPrice
    CALL storeAllFacilityInformation
    jmp staffMenu

facility_limit_reached:
    MOV AH, 09h
    LEA DX, msgFacilityLimitReached
    INT 21h
    RET


getFacilityName: 
    call lineBreak
    MOV AH, 09h
    LEA DX, msgEnterFacilityName
    INT 21h
    
    MOV AH, 0Ah
    LEA DX, inputFacilityNameBuffer
    INT 21h
    RET


getFacilityId: 
    call lineBreak
    MOV AH, 09h
    LEA DX, msgEnterFacilityID
    INT 21h
    
    MOV AH, 0Ah
    LEA DX, inputFacilityIDBuffer
    INT 21h
    mov ax, 0
    mov al, [inputFacilityIDBuffer+1]
    cmp al, 5
    jne invalid_FacilityId
    RET 
    
invalid_FacilityId: 
    call lineBreak
    MOV AH, 09h
    LEA DX, msgInvalidInputFacilityId
    INT 21h
    ; Jump back to re-enter price
    JMP getFacilityId
getFacilityPrice:
    MOV CX, MAX_SLOTS
    mov SI, 0         
    mov dx, 0
enter_slot_prices:

    PUSH CX  ; Save loop counter 
    push si  
    push dx
    CALL lineBreak
    MOV AH, 09h
    LEA DX, msgEnterSlotPrice
    INT 21h    
    
    MOV AH, 0Ah
    LEA DX, inputSlotPriceBuffer
    INT 21h
 
    ; Validate input length
    MOV AL, [inputSlotPriceBuffer+1]  ; Get actual input length
    CMP AL, 5
    JNE invalidPrice_input

    ; Store slot booking status and price
    MOV BL, facilityCounter
    mov BH, 0
    MOV AX, MAX_SLOTS * 5
    MUL BX     
    LEA DI, facilitySlotArray 
    add di, ax
    pop dx   
    push dx
    mov ax, 5
    mul dx        
    
    add di, ax
    lea si, inputSlotPriceBuffer+2
    mov cx, 5 
    call copy_string    
    pop dx
    
    jmp priceInput_ok

invalidPrice_input:
    ; Display error message  
    call lineBreak
    pop si
    pop dx
    POP CX 
    MOV AH, 09h
    LEA DX, msgInvalidInputFacilityPrice
    INT 21h
    ; Jump back to re-enter price
    JMP enter_slot_prices

priceInput_ok:
    pop si
    INC dx
    POP CX  ; Restore loop counter
    LOOP enter_slot_prices
    ; Increment facility counter
    INC facilityCounter
    RET


storeAllFacilityInformation:
    ; Store facility name
    mov cx, 0
    mov cl, facilityCounter
    dec cl  
    mov ax, 20
    mul cx
    lea di, facilityNameArray
    add di, ax
    lea si, inputFacilityNameBuffer+2
    mov cl, inputFacilityNameBuffer+1
    mov ch, 0
    call copy_String

    ; Store facility ID
    mov cx, 0
    mov CL, facilityCounter
    dec CL
    mov AX, 6
    mul CX
    lea DI, facilityIDArray
    add DI, AX
    lea SI, inputFacilityIDBuffer+2
    mov CL, inputFacilityIDBuffer+1   
    mov ch, 0  
    
    call copy_String

    RET             
    
noFacilityFound: 
    call lineBreak
    MOV AH, 09h
    LEA DX, msgNoFacility
    INT 21h 
    call stopRunFunc
    jmp memberMenu 
    
stopRunFunc:
call lineBreak 
     lea dx,pressAnyKey 
    mov ah, 09h
    int 21h

    ; Input Menu Choice
    mov ah, 01h
    int 21h  
    ret
displayFacility:
    mov al, [facilityCounter]
    cmp al, 0
    je noFacilityFound
    call clearScreen
    ; Display header
    MOV AH, 09h
    LEA DX, msgDisplayHeader
    INT 21h
    
    mov CX, 0 
    MOV CL, facilityCounter
    mov SI, 0  ; Initialize SI to 0 for indexing

display_loop:
    PUSH CX     ; Save loop counter
    CALL displayFacilityRow
    INC SI      ; Move to next facility
    POP CX      ; Restore loop counter
    LOOP display_loop

    ; Display footer
    MOV AH, 09h
    LEA DX, msgLine
    INT 21h
    call stopRunFunc
    jmp memberMenu 


displayFacilityRow:
    PUSH AX
    PUSH DX

    MOV AH, 02h
    MOV DL, '|'
    INT 21h

    CALL displayFacilityId
    CALL displayFacilityName
    CALL displayFacilityPrice

    MOV AH, 02h
    MOV DL, 0Dh
    INT 21h
    MOV DL, 0Ah
    INT 21h

    MOV AH, 09h
    LEA DX, msgLine
    INT 21h

    POP DX
    POP AX
    RET


displayFacilityId:
    PUSH SI
    MOV AX, 6   ; Each ID is 5 bytes
    MUL SI
    LEA DI, facilityIDArray
    ADD DI, AX
    
    MOV CX, 11   ; ID field width
    CALL displayPaddedField
    
    MOV AH, 02h
    MOV DL, '|'
    INT 21h
    
    POP SI
    RET


displayFacilityName:
    PUSH SI
    MOV AX, 20  ; Each name is 20 bytes
    MUL SI
    LEA DI, facilityNameArray
    ADD DI, AX
    
    MOV CX, 24  ; Name field width
    CALL displayPaddedField
    
    MOV AH, 02h
    MOV DL, '|'
    INT 21h
    
    POP SI
    RET


displayFacilityPrice:
    PUSH SI   ;fcility count
    MOV AX, MAX_SLOTS * 5  ; Each facility has MAX_SLOTS * 2 bytes for prices
    MUL SI
    LEA DI, facilitySlotArray
    ADD DI, AX
    
    MOV CX, MAX_SLOTS
display_price_loop:
    MOV AX, [DI]   ; Load 16-bit price
    PUSH CX
    MOV CX, 6      ; Width for each price
    CALL displayPaddedNumber
    POP CX
    
    LOOP display_price_loop

    MOV AH, 02h
    MOV DL, '|'
    INT 21h
    
    POP SI
    RET

displayPaddedField:
    ; DI = start of string, CX = field width
    PUSH AX
    PUSH BX
    PUSH DX

    MOV BX, CX  ; Save field width
    MOV CX, 0   ; Character counter

print_char_loop:
    MOV AL, [DI]
    CMP AL, '$'
    JE pad_remaining
    MOV AH, 02h
    MOV DL, AL
    INT 21h
    INC DI
    INC CX
    CMP CX, BX
    JL print_char_loop

    JMP end_padding

pad_remaining:
    CMP CX, BX
    JGE end_padding
    MOV AH, 02h
    MOV DL, ' '
    INT 21h
    INC CX
    JMP pad_remaining

end_padding:
    POP DX
    POP BX
    POP AX 
    
    RET


displayPaddedNumber:
    ; bx = number to display, CX = field width
    PUSH BX
    PUSH DX
    PUSH SI
    mov bx, 5
     
    printNumber: 
    cmp bx,0
    je printSpace
    mov ah, 02h
    mov dl, [di]  
    int 21h
    dec bx 
    dec cx
    inc di
    jmp printNumber
    
    printSpace:
    cmp cx,0
    je printDone
    MOV AH, 02h
    MOV DL, ' '
    INT 21h 
    dec cx
    jmp printSpace  
    
    printDone:
    POP SI
    POP DX
    POP BX
    RET

 
 
 
 displayAvailableFacility: 
    mov al, [facilityCounter]
    cmp al, 0
    je noFacilityFound
    PUSH AX
    PUSH BX
    PUSH CX
    PUSH DX
    PUSH SI
    PUSH DI
    call clearScreen
    ; Display header
    MOV AH, 09h
    LEA DX, msgDisplayAvailableHeader
    INT 21h
    
    mov CX, 0
    mov [totalAmount], cl
    MOV CL, facilityCounter
    mov SI, 0  ; Initialize SI to 0 for indexing facilities

displayFacilityAvailable_loop:
    PUSH CX     ; Save loop counter
    MOV AH, 02h
    MOV DL, '|'
    INT 21h
    ; Display facility ID
    CALL displayFacilityId

    ; Display facility name
    CALL displayFacilityName

    ; Display facility availability
    PUSH SI
    MOV AX, 24
    MUL SI
    LEA DI, facilityBookArray
    ADD DI, AX
    
    MOV CX, MAX_SLOTS
display_availability_loop:
    MOV AL, [DI]
    CMP AL, '$'
    JE slot_available
    
    ; Slot is not available
    MOV AH, 09h
    LEA DX, notAvailableMsg
    INT 21h
    JMP next_slot

slot_available:
    MOV AH, 09h
    LEA DX, availableMsg
    INT 21h

next_slot:
    ; Add space for formatting
    MOV AH, 02h
    MOV DL, ' '
    INT 21h

    add DI, 4
    LOOP display_availability_loop

    ; Add trailing spaces to align with other columns
add_trailing_spaces:
    

    MOV AH, 02h
    MOV DL, '|'
    INT 21h
    
    POP SI

    ; Move to next line
    MOV AH, 02h
    MOV DL, 0Dh
    INT 21h
    MOV DL, 0Ah
    INT 21h

    ; Display separator line
    MOV AH, 09h
    LEA DX, msgLine
    INT 21h

    INC SI      ; Move to next facility
    POP CX      ; Restore loop counter
    LOOP displayFacilityAvailable_loop

    ; Display footer
    MOV AH, 09h
    LEA DX, msgLine
    INT 21h

    POP DI
    POP SI
    POP DX
    POP CX
    POP BX
    POP AX 
    call resetVariablesExact 
bookingFacility: 
    
    MOV AH, 09h
    LEA DX, bookFacilityMsg
    INT 21h
    
    MOV AH, 0Ah
    LEA DX, inputFacilityIDBuffer 
    INT 21h     
    
    mov ax, 0
   
    lea si, facilityIDArray
    lea di, inputFacilityIDBuffer
    add di, 2
    mov bx, 0
    mov bl, 5  
    mov dx, 0 
    mov cx, 0
    mov cl, facilityCounter 
    call outerLoopArray
    cmp ax, 0
    jne handle_booking_failure  ;??id
    mov bx, 0
    mov bl, memberCurrentNumber
    mov tmpFacilityNumber, bl
bookingSlot:    
    bookSlot:
    MOV AH, 09h
    LEA DX, bookSlotMsg
    INT 21h
 
    MOV AH, 0Ah
    LEA DX, tmpSlotBuffer 
    INT 21h   

    ; Validate input
    MOV AL, [tmpSlotBuffer+1]  ; Get actual input length
    CMP AL, 1
    JNE invalid_input

    MOV AL, [tmpSlotBuffer+2]  ; Get the input character
    CMP AL, '1'
    JB invalid_input
    CMP AL, '6'
    JA invalid_input

    ; Input is valid, continue with booking  
   
    mov bx, 0
    lea di, facilityBookArray
    mov bl, tmpFacilityNumber 
    mov ax, 24
    mul bx
    add di, ax
    mov bx, 0
    mov bl, [tmpSlotBuffer+2] 
    sub bl, 30h
    mov ax, 4 
    mul bx 
    sub ax, 4
    add di, ax 
    cmp [di], '$'
    jne invalid_input
    mov cx, 4
    lea si, memberLoginId
    call copy_String 
    call calculateTotalAmount
    
ask_continue_booking:
    ; Display the inquiry message
    mov ah, 09h
    lea dx, continueBookingMsg
    int 21h

    ; Read user input
    mov ah, 01h
    int 21h

    ; Check the input
    cmp al, 'Y'
    je bookingFacility
    cmp al, 'y'
    je bookingFacility
    cmp al, 'N'
    je exit_booking
    cmp al, 'n'
    je exit_booking

    ; Invalid input, display error message and ask again
    mov ah, 09h
    lea dx, invalidInputMsg
    int 21h
    jmp ask_continue_booking

exit_booking:  
    call addThreePercentTax
    CALL displayTotalAndPaymentOptions
    jmp memberMenu 
    
invalid_input:
    call lineBreak
    ; Display error message
    MOV AH, 09h
    LEA DX, bookFailMsg
    INT 21h  
    jmp ask_continue_booking

calculateTotalAmount:
    lea si, facilitySlotArray 
    xor bx, bx
    mov bl, tmpFacilityNumber
    mov ax, 30
    mul bx
    add si, ax                        ; 这里还是2 要改去5
    xor bx, bx
    mov bl, [tmpSlotBuffer + 2] 
    sub bl, 31h
    mov ax, 5                         ; 从2改为5
    mul bx
    add si, ax
    mov cx, 5                         ; 从2改为5，复制更多位数
    lea di, tmpAmount
    call copy_String

    ; 初始化指针
    lea si, tmpAmount          ; 指向新金额
    lea di, totalAmount        ; 指向总金额
    add si, 4                         ; 移动到最后一位数字
    add di, 5                         ; 移动到最后一位数字
    mov cx, 5                         ; 6位数字（包括小数点和可能的进位）
    mov dx, 0                              ; 清除进位标志
    push dx
add_loop:
    pop dx
    mov al, [si]                      ; 获取新金额的一位
    mov bl, [di]                      ; 获取总金额的对应位
    
    cmp al, '.'                       ; 检查是否为小数点
    je skip_add                       ; 如果是小数点，跳过加法
    cmp bl, '.'
    je skip_add
    
    sub al, '0'                       ; 转换字符到数字
    sub bl, '0'
    
    adc al, bl                        ; 相加，包括之前的进位
    
    mov ah, 0
    mov bl, 10
    div bl                            ; 除以10，AL存商，AH存余数   
    add ah, dl
    
    add ah, '0'                       ; 转换回字符
    mov [di], ah                      ; 存储结果
    mov dx, 0
    mov dl, al  

    ; AL 现在包含进位（如果有的话）
    
skip_add: 
    push dx
    dec si
    dec di
    loop add_loop 
    pop dx

    ; 处理最后可能的进位              
    cmp dl, 1
    
    jne end_add                       ; 如果没有进位，结束
    mov byte ptr [di], '1'            ; 如果有进位，在最前面加1

end_add:
    ret
          
          
          
          

addThreePercentTax:
    push si
    push di
    push cx
    push dx
    push ax
    push bx
    
    mov bx, 0
    mov cx, 0 
    lea si, totalAmount
    lea di, tempTax           
getTotalAmountLength: 
    inc bx
    inc si
    cmp [si], '$'
    jne  getTotalAmountLength
    

getTempTaxLength:
    inc cx 
    inc di
    cmp [di], '$'
    jne getTempTaxLength
    lea si, totalAmount
    lea di, tempTax  
    push cx 
    dec bx
    add si, bx
    dec cx
    add di, cx  
    dec cx
copyNumber:
    
    cmp [si],'.' 
    je decimal_point
    mov al, [si]
    mov [di], al  
    dec di
    dec si
    loop copyNumber 
    jmp getAfterTaxLength
    
decimal_point:
    dec si
    loop copyNumber
    
       
getAfterTaxLength:
    lea di, totalAmountAfterTax
    mov cx, 0
    getAfterTaxLengthLoop:
    cmp [di],'$'
    je getLength 
    inc cx
    inc di
    jmp getAfterTaxLengthLoop
    
getLength:
    pop bx 
    dec bx
      
    push bx                     ;AL存商，AH存余数
    lea si,tempTax
    lea di, totalAmountAfterTax
    add si, bx 
    dec cx  
    push cx
    add di, cx               
    mov ax, 0 
    mov dx, 0
    multipleLoop: 
    cmp [di], '.'
    je nextDI
    
    mov cl, 3  
    mov al, [si]
    sub al, '0' 
    mul cl 
    add al, dl
    mov cx, 0                 ;3%
    mov cl, 10 
    div cl 
    mov [di], ah  
    add [di], '0'
    
    mov dx, 0
    mov dl, al  
    dec bx
    cmp bx, 1
    je multipleDone
    dec si
    dec di
    mov ax, 0
    jmp multipleLoop
nextDI:
    dec di
    jmp multipleLoop        
    
multipleDone:
    dec di
    add [di], dl
addTotalAmount:
    pop cx  
    pop bx
    dec cx
    lea si, tempTax
    lea di, totalAmountAfterTax
    add si, bx
    add di, cx 
    mov dx, 0 
    addTotalAmountLoop:
    cmp bx,0
    je end_conversion 
    cmp [di], '.'
    je skipPoint
    sub [si], '0' 
    sub [di], '0'
    mov ax, 0
    mov al, [si]
    add al, [di]
    add al, dl 
    mov dl, 10
    div dl
    mov [di], ah
    add [di], '0'
    mov dl, al
    dec di
    dec si 
    dec bx
    jmp addTotalAmountLoop
        
skipPoint:
    dec di
    jmp addTotalAmountLoop     

end_conversion:
    cld                 ; 清除方向标志

    pop bx
    pop ax
    pop dx
    pop cx
    pop di
    pop si
    ret

displayTotalAndPaymentOptions:
  
    
   call printTotalAmount

    ; Display payment options
    MOV AH, 09h
    LEA DX, paymentOptions
    INT 21h

    ; Get payment method choice
    MOV AH, 01h
    INT 21h
    SUB AL, '0'  ; Convert ASCII to number

    ; Display selected payment method
    PUSH AX
    MOV AH, 09h
    LEA DX, paymentMethodMsg
    INT 21h
    POP AX

    CMP AL, 1
    JE online_banking
    CMP AL, 2
    JE card_payment
    CMP AL, 3
    JE e_wallet

online_banking:
    MOV AH, 09h
    LEA DX, onlineBankingMsg
    JMP display_payment_method

card_payment:
    MOV AH, 09h
    LEA DX, cardPaymentMsg
    JMP display_payment_method

e_wallet:
    MOV AH, 09h
    LEA DX, eWalletMsg

display_payment_method:
    INT 21h

 
    RET
              
              
printTotalAmount:
    ; 打印提示信息
    MOV AH, 09h
    LEA DX, paymentConfirmation
    INT 21h

    ; 设置指针指向 totalAmount
    lea si, totalAmountAfterTax
    
    ; 循环打印每个字符
print_loop:
    mov al, [si]    ; 获取一个字符 
    cmp al, '$'       ; 检查是否到字符串结尾
    je print_end    ; 如果是，结束打印
    
    mov ah, 0Eh     ; BIOS 中断：在 TTY 模式下显示字符
    int 10h         ; 调用 BIOS 中断
    
    inc si          ; 移动到下一个字符
    jmp print_loop  ; 继续循环

print_end:
    ; 打印换行
    mov ah, 0Eh
    mov al, 0Dh     ; 回车
    int 10h
    mov al, 0Ah     ; 换行
    int 10h
    
    ret
    
displayNumber:
    ; AX contains the number to display
    PUSH AX
    PUSH BX
    PUSH CX
    PUSH DX

    MOV BX, 10
    MOV CX, 0

convert_loop:
    XOR DX, DX
    DIV BX
    PUSH DX
    INC CX
    TEST AX, AX
    JNZ convert_loop

displayCalculation_loop:
    POP DX
    ADD DL, '0'
    MOV AH, 02h
    INT 21h
    LOOP displayCalculation_loop

    POP DX
    POP CX
    POP BX
    POP AX
    RET



displayUserBookings:
    PUSH AX
    PUSH BX
    PUSH CX
    PUSH DX
    PUSH SI
    PUSH DI

    ; Display title
    MOV AH, 09h
    LEA DX, userBookingsMsg
    INT 21h

    MOV CX, 0
    MOV CL, facilityCounter
    mov SI, 0  ; SI is used as the facility index
    MOV CX, 0
facility_loop: 

    lea DI, facilityBookArray  ; DI is used as the time slot index  
    MOV AX, 24  ; Each facility is 24 bytes
    MUL cx      ; AX = 24 * facility index
    add di, ax  
   
    push cx
    mov cx, 0 
    
slot_loop:
    push di
    mov ax, 4
    mul cx
    ADD di, ax  ; AX = total offset
    
    ; Compare booked user ID 
    push cx
    MOV CX, 4
    LEA SI, memberLoginId
    CALL compareStringLoop      
    pop cx  
    pop di
    CMP AX, 0
    JNE nextDisplay_slot
    
    ; Match found for booking, display information
    CALL displayBookingInfo

nextDisplay_slot:

    cmp cx, 6
    je nextFacility_slot 
    inc cx   

    jmp slot_loop
nextFacility_slot:
    pop cx
    cmp cl , [facilityCounter]   ; Problem is here
    je  end_display
    inc cx  
    jmp facility_loop

    ; Check if any bookings were found
    

end_display:
    POP DI
    POP SI
    POP DX
    POP CX
    POP BX
    POP AX
    jmp memberMenu


displayBookingInfo: 
    pop ax 
    
    mov bx, cx 
    pop cx
    push ax

    push di          
    push cx
    
    ; Display facility ID
    MOV AH, 09h
    LEA DX, bookingEntryMsg
    INT 21h 
    
    MOV AX, 6
    MUL cx  ; SI is the facility index
    LEA DI, facilityIDArray
    ADD DI, AX   
     
    MOV CX, 5 
    mov si, di
    CALL displayString

    ; Display time slot 
    MOV AH, 09h
    LEA DX, slotMsg
    INT 21h  
    inc bx
    mov ax, bx
    call displayNumber
    call lineBreak 
    pop cx 
    pop di
    pop ax
    push cx
    mov cx, bx 
    push ax
    RET



displayString:
    ; SI = starting address of the string, CX = field width
    PUSH AX
    PUSH BX
    PUSH DX

display_char_loop:
    MOV AL, [SI]
    CMP AL, '$'
    JE end_display_string
    MOV AH, 02h
    MOV DL, AL
    INT 21h
    INC SI
    LOOP display_char_loop

end_display_string:
    POP DX
    POP BX
    POP AX
    ret
    
 
    
handle_booking_failure:   

    mov ah, 09h
    lea dx, bookFailMsg
    int 21h
    ; Display inquiry message
    mov ah, 09h
    lea dx, continueBookingMsg
    int 21h

    ; Read user input
    mov ah, 01h
    int 21h

    ; Check input
    cmp al, 'Y'
    je bookingFacility
    cmp al, 'y'
    je bookingFacility
    cmp al, 'N'
    je memberMenu
    cmp al, 'n'
    je memberMenu

    ; Invalid input, display error message and re-ask
    mov ah, 09h
    lea dx, invalidInputMsg
    int 21h
    jmp handle_booking_failure
    jmp memberMenu




exitProgram:
    ; Display exit message
    lea dx, exitMsg
    mov ah, 09h
    int 21h

    ; Terminate program
    mov ah, 4Ch
    int 21h

main ENDP

; Improved compareString procedure
compareString PROC
    ; SI = pointer to stored string (null-terminated)
    ; DI = pointer to input string (length-prefixed)
    push cx
    push ax
    
    mov cl, [di-1]  ; Get length of input string
    xor ch, ch      ; Clear CH to use CX as counter
    
compareLoopp:
    mov al, [si]    ; Get character from stored string
    cmp al, 0       ; Check if end of stored string
    je checkInputEnd
    
    cmp al, [di]    ; Compare characters
    jne notEqual
    
    inc si          ; Move to next character in stored string
    inc di          ; Move to next character in input string
    loop compareLoopp
    
    ; If we've exhausted the input string length, check if stored string has ended
    cmp byte ptr [si], 0
    je stringsEqual
    
notEqual:
    pop ax
    pop cx
    or al, 1        ; Set ZF = 0 (strings not equal)
    ret
    
checkInputEnd:
    ; We've reached the end of the stored string, make sure input has ended too
    cmp cx, 0
    je stringsEqual
    ; If input string is longer, strings are not equal
    jmp notEqual

stringsEqual:
    pop ax
    pop cx
    xor al, al      ; Set ZF = 1 (strings equal)
    ret
    
compareString ENDP

;lineBreak function
lineBreak PROC
    mov ah,09h
    lea dx, lb
    int 21h
    ret
lineBreak ENDP

;clearScreenFunction
clearScreen PROC
    mov ax, 0600h
    ;black background white font
    mov bh, 07h
    mov cx, 0000h
    mov dx, 184FH
    int 10H

    ;cursor back to first place
    mov ah,02h
    mov bh,00
    mov dh,00
    mov dl,00
    int 10h
    ret
clearScreen ENDP


staffManagementFunction proc
    displayStaffManagementPage:
    ;staff function
    call clearScreen
    mov ah,09h 
    lea dx, staffManagementPage
    int 21h
    ;selection menu
    mov ah,01h
    int 21h
    cmp al, '1'
    je addNewStaff
    cmp al, '2'
    je editstaff
    cmp al, '3'
    je displaystaff
    cmp al, '4'
    call clearScreen
    je staffMenu
    
    ;display when input != 1-5
    mov ah,09h
    lea dx, warningMessegeStaffManagement
    int 21h
    call lineBreak
    mov ah,09h
    lea dx, pressAnyKey
    int 21h
    mov ah,01h
    int 21h
    jmp displaystaffmanagementpage

;AddStaff
addNewStaff:
    call lineBreak
    mov ah,09H
    lea dx,newStaffIDMsg
    int 21h
    mov ah, 0Ah
    lea dx, newIdBuffer
    int 21h
    ;check 1-9
    cmp al,0
    jl invalidIDInput
    ; first 1 for actual size of array, second is for the actual input from users
    lea dx, newIdBuffer +2
    ;check 1 because of the index 1 is putting the input size from the user, input 7 than idBuffer[1] is 7
    cmp newIdBuffer[1], 7
    jl invalididinput
    jg invalididinput

    ;finding the array place to put the input inside
    mov di, 0
    mov ax, 0
    mov al, staffCounter
    mov cx, ax
    ;use to check by using the current staff member amount
    checkingIDStorageLoop:
    inc di
    mov bl, staffIDArray[di]
    cmp bl, "$"
    je checkingIDLoop
    jmp checkingIDStorageLoop
    
    ;cmp how many users in here
    checkingIDLoop:
    mov ax, 0
    cmp cx, 0
    je storingidinput
    loop checkingidstorageloop:

    ;started to putting the input inside the array
    storingIDInput:
    mov ax, 0
    mov si, 2
    ;loop until all string number been store inside the array
    storeLoop:
    inc di
    mov al, newIdBuffer[si]
    mov staffIDArray[di], al
    ;for number it will put /r in the end dk why
    cmp al, 0DH
    ;to store dollar sign in end of the string
    je storeIDDollarSign
    inc si
    jmp storeloop
    call lineBreak

    ;storing dollar sign to end of the array
    storeIDDollarSign:
    inc si
    mov al, "$"
    mov staffIDArray[di], al
    mov al, newIDBuffer[1] 
    mov lastUserIdLength, al
    ;for the dollar sign
    add lastUserIdLength, 1
    ;jump to next procedure
    jmp nameinput 
 
    ;how it work???
    NameInput:
    call lineBreak
    mov ah,09h
    lea dx,newStaffNameMsg
    int 21h
    mov ah,0Ah
    lea dx, newNameBuffer
    int 21h
    lea dx, newNameBuffer +2

    ;process
    mov di,0
    mov ax,0
    mov al, staffCounter
    mov cx,ax

    checkingNameStorageLoop:
    inc di
    mov bl, staffNameArray[di]
    cmp bl, "$"
    je checkingNameLoop
    jmp checkingnamestorageloop

    checkingNameLoop:
    mov ax, 0
    cmp cx, 0
    je storingNameInput
    loop checkingnamestorageloop
    
    storingNameInput:
    mov ax, 0
    mov si, 2
    ;loop until all string been store inside the array
    storeNameLoop:
    inc di
    mov al, newNameBuffer[si]
    cmp al, 0DH
    je storeNameDollarSign
    mov staffNameArray[di], al
    ;store all until it store $
    ;to store dollar sign in end of the string
    inc si
    jmp storeNameloop

    storeNameDollarSign:
    inc si
    mov al, "$"
    mov staffNameArray[di], al
    mov al, newNameBuffer[1] 
    mov lastUserNameLength, al
    ;for the dollar sign
    add lastUserNameLength, 1
    

    ;clear the input buffer for next input use
    mov cx, 20
    mov si, 0
    nameClearL1:
    mov newNameBuffer[si], 20H ;20H represent empty in ascii
    inc si
    loop nameClearL1:
    jmp passwordInput

    ;same concenpt in add new staff name, literally copy and paste only me
    passwordInput:
    call lineBreak
    mov ah,09h
    lea dx, newStaffPasswordMsg
    int 21h
    mov ah, 0Ah
    lea dx, newPasswordBuffer
    int 21h
    lea dx, newPasswordBuffer + 2
    
    ;password input process
    mov di,0
    mov ax,0
    mov al, staffCounter
    mov cx,ax
    
    ;check where should the password store
    checkingPasswordStorageLoop:
    inc di
    mov bl, staffPasswordArray[di]
    cmp bl, "$"
    je checkingPasswordLoop
    jmp checkingPasswordStorageLoop
    
    checkingPasswordLoop:
    mov ax,0
    cmp cx,0
    je storingPasswordInput
    loop checkingpasswordstorageloop
    
    storingPasswordInput:
    mov ax,0
    mov si,2
    ;loop until all input store inside
    storePasswordLoop:
    inc di
    mov al, newPasswordBuffer[si]
    cmp al, 0DH
    je storePasswordDollarSign
    mov staffPasswordArray[di], al
    inc si
    jmp storepasswordloop

    storePasswordDollarSign:
    inc si
    mov al, "$"
    mov staffPasswordArray[di],al
    mov al, newPasswordBuffer[1]
    mov lastUserPasswordLength, al
    add lastUserPasswordLength, 1
    
    mov cx,20
    mov si,0
    passwordClearL1:
    mov newPasswordBUffer[si], 20H
    inc si
    loop passwordclearl1:
    jmp addStaffEnding

    addStaffEnding:
    call lineBreak
    inc staffCounter
    mov ah, 09H
    lea dx, addStaffEndingMsg
    int 21h
    call lineBreak
    ;let the users choose adding another new staff
    mov ah, 09H
    lea dx, addingNewStaffMsg
    int 21h
    mov ah,01H
    int 21h
    cmp al, "1"
    je addnewstaff
    call pressKeyContinueFunction
    jmp displaystaffmanagementpage


invalidIDInput:
    call lineBreak
    mov dx,0
    mov ah,09h 
    lea dx, newIDErrorMsg
    int 21H
    jmp addnewstaff

staffFull:
    mov ah, 09h
    lea dx, staffCounterFull
    int 21h
    call pressKeyContinueFunction
    jmp displaystaffmanagementpage

;AddStaff

;---EditStaff---
editStaff:
    call lineBreak
    ;clear all the required thing first
    mov passwordCounter, 0
    mov cx,0
    mov cl, staffCounter
    mov bx,0
    mov ax,0
    mov di,0; for array that exist to compared 
    mov si,2; for users input
    currentPasswordInput:
    mov ah,09h
    ;prompt msg
    lea dx, currentPasswordMsg
    int 21H
    ;put inside passwordBuffer
    mov ah,0AH
    lea dx, currentPasswordBuffer
    int 21H

    compareCurrentPassword:
    mov al, currentPasswordBuffer[si]
    mov bl, staffPasswordArray[di]
    cmp bl, "$"
    je newPasswordInput
    inc si
    inc di
    cmp al, bl
    jne loopingprocess
    inc passwordCounter ; for later subtraction, to replace new password into the correct slot
    jmp comparecurrentpassword

    newPasswordInput:
    call lineBreak
    mov ax,0
    mov bx,0
    mov si,2; input string start with 2
    sub di, passwordCounter;for allocate the precious location for storing the password
    ;msg for input new password
    mov ah,09h
    lea dx, newPasswordMsg
    int 21h
    mov ah,0Ah
    lea dx, newPasswordBuffer
    int 21h


    newPasswordProcess:
    mov al,newPasswordBuffer[si]
    cmp al, 0DH
    je passwordSignProcess
    mov staffPasswordArray[di], al    
    inc si
    inc di
    jmp newPasswordProcess



    ;use to put the $ at the end of character
    passwordSignProcess:   
    mov staffPasswordArray[di], "$"
    jmp endingEdit



    ;end of the edit process
    endingEdit:
    ;clear the input buffer for the next time usage
    mov cx,20
    mov si,0
    passwordClearL1Edit:
    mov currentPasswordBuffer[si], 20h
    mov newPasswordBuffer[si], 20H
    inc si
    loop passwordClearL1Edit:
    ;ending msg
    call lineBreak
    mov ah,09h
    lea dx,successfulMsg
    int 21h
    call pressKeyContinueFunction
    jmp displayStaffManagementPage

    ;see can loop or not, if not, jump to invalid
    loopingProcess:
    loop editLoopl1:
    jmp passwordinvalidmsg

    ;use to loop to find the accurate placeholder for the array, same concept with login function
    editLoopL1:; if cx > 2 loop here, else jump to invalid messege
    cmp staffPasswordArray[di], "$"
    je editLoopL2
    inc di
    jmp editLoopL1
    
    editLoopL2:
    mov passwordCounter, 0;reset counter to ensure accuracy
    mov si, 2
    inc di
    jmp comparecurrentpassword

    passwordInvalidMsg:
    call lineBreak
    mov ah,09h
    lea dx, passwordInvalid
    int 21h
    call pressKeyContinueFunction
    jmp displaystaffmanagementpage

;---Edit Staff---


;DeleteStaff
deleteStaff:
    call lineBreak
    mov ah,09h
    lea dx, developmentMessege
    int 21H
    jmp displayStaffManagementPage
;DeleteStaff

;---DisplayStaff---
displayStaff:
    call clearScreen
    ;StaffInformation    
    mov ah, 09h
    lea dx, staffInfo
    int 21H
    call lineBreak
    ;dashline
    mov ah, 09h
    lea dx, dashline
    int 21h
    call lineBreak

    mov ah,09h
    lea dx, displayIDName
    int 21h
    call lineBreak
    
    ;preparation for looping to display
    mov ax, 0
    mov al, staffCounter
    mov cx,ax
    mov si, 0
    mov di, 0

    
    ;display all array staff id and name
    loopDisplay:
    mov ah, 09h
    lea dx, staffIDArray[si]
    int 21h
    mov ah, 09h
    lea dx, nineSpace
    int 21h
    mov ah, 09h
    lea dx, staffNameArray[di]
    int 21h

    call lineBreak
    ;check name array until reach $ 
    nameArrayDelimeter:
    mov al, staffNameArray[di]
    cmp al, "$"
    je idArrayDelimiter
    inc di
    jmp nameArrayDelimeter
    ;check id array until reach $
    idArrayDelimiter:
    mov al, staffIDArray[si]
    cmp al, "$"
    je continueLoop
    inc si
    jmp idArrayDelimiter

    continueLoop:
    inc si
    inc di
    inc bl
    loop loopDisplay:

    mov ah, 09h
    lea dx, totalStaffMsg
    int 21h

    ;check staff > 10 or < 10
    mov ax,0
    mov al, staffCounter
    cmp al, 10
    jge counterMoreTen
    jne counterLessTen

    ;when staff counter < 10 
    counterLessTen:
    add staffCounter, 30H
    mov ah, 02h
    mov dl, staffCounter 
    int 21h
    jmp pressKey

    ;when staff counter > 10
    counterMoreTen:
    ;use division to print the charcter  
    mov bl, 10
    div bl
    mov bl, al
    mov bh, ah
    ;printing process
    mov ah,02h
    mov dl, bl
    add dl ,30H
    int 21h
    mov ah, 02h
    mov dl, bh
    add dl, 30H
    int 21h

    ;at the end i minus counter, if here no subtract will cause error in 2nd time display
    add staffCounter, 30H
    jmp pressKey
    

    ;return to module by pressing any key, because it will clear screen when going back to staff module
    pressKey:
    call lineBreak
    mov ah,09H
    lea dx, pressAnyKey
    int 21h
    mov ah,01H
    int 21H
    
    ;after display minus back 30H for let the staffCounter can put on cx again, for the second display 
    sub  staffCounter, 30H

    jmp displayStaffManagementPage
;---DisplayStaff---


staffManagementFunction endp

pressKeyContinueFunction proc
    call lineBreak
    mov ah,09H
    lea dx, pressAnyKey
    int 21h
    mov ah,01H
    int 21H
    ret
pressKeyContinueFunction endp  
resetVariablesExact proc
    push si
    push cx
    push ax

    ; Reset tmpAmount
    lea si, tmpAmount  
    mov byte ptr [si], '0'     ; Third digit
    inc si
    mov word ptr [si], '00'    ; First two digits
    add si, 2
    mov byte ptr [si], '.'     ; Decimal point
    inc si
    mov word ptr [si], '00'    ; Two decimal places
    add si, 2
    mov byte ptr [si], '$'     ; Terminator

    ; Reset totalAmount (same as tmpAmount)
    lea si, totalAmount   
    mov byte ptr [si], '0'     ; Third digit
    inc si
    mov word ptr [si], '00'    ; First two digits
    add si, 2
    mov byte ptr [si], '.'     ; Decimal point
    inc si
    mov word ptr [si], '00'    ; Two decimal places
    add si, 2
    mov byte ptr [si], '$'     ; Terminator

    ; Reset tempTax
    lea si, tempTax
    mov cx, 7                  ; 7 zeros
    mov al, '0'
resetTempTax:
    mov [si], al
    inc si
    loop resetTempTax
    mov byte ptr [si], '$'     ; Terminator

    ; Reset totalAmountAfterTax
    lea si, totalAmountAfterTax
    mov word ptr [si], '00'    ; First two digits
    add si, 2
    mov byte ptr [si], '0'     ; Third digit
    inc si
    mov byte ptr [si], '.'     ; Decimal point
    inc si
    mov word ptr [si], '00'    ; First two decimal places
    add si, 2
    mov byte ptr [si], '0'     ; Third decimal place
    inc si
    mov byte ptr [si], '$'     ; Terminator

    pop ax
    pop cx
    pop si
    ret
resetVariablesExact endp

END main