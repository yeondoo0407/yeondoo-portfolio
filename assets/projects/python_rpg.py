import random
import winsound
import time

# 플레이어 클래스
class Player:
    def __init__(self, name):
        self.name = name
        self.health = 60
        self.attack_power = 10

    def attack(self, enemy):
        damage = random.randint(1, self.attack_power)
        enemy.take_damage(damage)
        print(f"{self.name}이(가) {enemy.name}에게 {damage}만큼의 피해를 입혔습니다!")
        time.sleep(1)
        winsound.Beep(400,500)

    def take_damage(self, damage):
        self.health -= damage
        if self.health <= 0:
            print(f"{self.name}이(가) 전투에서 패배하였습니다!")
            winsound.Beep(400,500)

# 적 클래스
class Enemy:
    def __init__(self, name, health, attack_power):
        self.name = name
        self.health = health
        self.attack_power = attack_power

    def attack(self, player):
        damage = random.randint(1, self.attack_power)
        player.take_damage(damage)
        print(f"{self.name}이(가) {player.name}에게 {damage}만큼의 피해를 입혔습니다!")
        time.sleep(1)
        winsound.Beep(400,500)

    def take_damage(self, damage):
        self.health -= damage
        if self.health <= 0:
            print(f"{self.name}이(가) 전투에서 사망하였습니다!")
            winsound.Beep(400,500)

# 게임 시작
def start_game():
    print("텍스트 RPG 게임에 오신 것을 환영합니다!")
    time.sleep(1)
    winsound.Beep(400,500)

    player_name = input("플레이어 이름을 입력하세요: ")
    time.sleep(1)
    winsound.Beep(400,500)
    
    player = Player(player_name)
   

    enemy = Enemy("몬스터", 60, 10)
    

    while True:
        print(f"\n{player.name}: 체력({player.health}) / 공격력({player.attack_power})")
        print(f"{enemy.name}: 체력({enemy.health}) / 공격력({enemy.attack_power})")
        print("\n1. 공격")
        print("2. 도망\n")

        choice = input("선택할 행동의 번호를 입력하세요: ")
        winsound.Beep(400,500)

        if choice == '1':
            player.attack(enemy)
            if enemy.health <= 0:
                print("몬스터를 처치하였습니다! 게임을 종료합니다.")
                winsound.Beep(400,500)
                break

            enemy.attack(player)
            if player.health <= 0:
                print("플레이어가 사망하였습니다! 게임을 종료합니다.")
                winsound.Beep(400,500)
                break

        elif choice == '2':
            print("도망쳤습니다! 게임을 종료합니다.")
            winsound.Beep(400,500)
            break

        else:
            print("올바른 선택지를 입력해주세요.")
            winsound.Beep(400,500)

# 게임 실행
start_game()

